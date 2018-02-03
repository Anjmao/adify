package main

import (
	"net/http"

	"adify/model"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	validator "gopkg.in/go-playground/validator.v9"
)

func main() {
	e := echo.New()
	e.Validator = &customValidator{validator: validator.New()}
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

type customValidator struct {
	validator *validator.Validate
}

func (cv *customValidator) Validate(i interface{}) error {
	return cv.validator.Struct(i)
}
