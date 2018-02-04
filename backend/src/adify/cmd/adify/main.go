package main

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"net/http"
)


func main() {

	db, err := gorm.Open("postgres", "host=localhost user=admin dbname=adify sslmode=disable password=admin")
	defer db.Close()
	if err != nil {
		panic(err)
	}


	e := echo.New()
	e.Debug = true
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.GET("/", homePageHandler)
	e.GET("/_ah/health", healthCheckHandler)

	e.Logger.Fatal(e.Start(":8080"))
}

func healthCheckHandler(c echo.Context) error {
	return c.String(http.StatusOK, "ok")
}

func homePageHandler(c echo.Context) error {
	return c.String(http.StatusOK, "hello")
}

func test(db *gorm.DB) {

}
