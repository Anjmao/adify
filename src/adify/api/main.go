package main

import (
	"log"
	"net/http"
	"os"

	"adify/api/db"
	"adify/api/route/ad"
	"adify/api/route/auth"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	validator "gopkg.in/go-playground/validator.v9"
)

func main() {
	projectID := os.Getenv("DATASTORE_PROJECT_ID")
	client, err := db.NewDataStoreClient(projectID)
	if err != nil {
		log.Fatalf("error creating datastore client %v", err)
	}

	adDB, err := db.NewAdDatabase(client)
	if err != nil {
		log.Fatalf("error creating ad database %v", err)
	}
	defer adDB.Close()

	e := echo.New()
	e.Validator = &customValidator{validator: validator.New()}
	e.Debug = true
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.GET("/", homePageHandler)
	e.GET("/_ah/health", healthCheckHandler)

	ad.Register(e, adDB)
	auth.Register(e)

	e.Logger.Fatal(e.Start(":8080"))
}

func healthCheckHandler(c echo.Context) error {
	return c.String(http.StatusOK, "ok")
}

func homePageHandler(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}

type customValidator struct {
	validator *validator.Validate
}

func (cv *customValidator) Validate(i interface{}) error {
	return cv.validator.Struct(i)
}
