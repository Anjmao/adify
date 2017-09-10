package main

import (
	"net/http"

	"github.com/anjmao/adify/api/db"
	"github.com/anjmao/adify/api/model"
	"github.com/labstack/echo"
	"log"
)

func main() {
	client, err := db.NewDataStoreClient("itjobs-179416")
	if err != nil {
		log.Fatalf("error creating datastore client %v", err)
	}

	adDB, err := db.NewAdDatabase(client)
	if err != nil {
		log.Fatalf("error creating ad database %v", err)
	}

	adH := adHandlers{db: adDB}

	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	e.GET("/_ah/health", healthCheckHandler)

	e.GET("/ads", adH.getAds)
	e.POST("/ads", adH.createAd)

	e.Logger.Fatal(e.Start(":8080"))
}

type adHandlers struct {
	db db.BookDatabase
}

func (h *adHandlers) getAds(c echo.Context) error {
	ads, err := h.db.ListBooks()
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, ads)
}

func (h *adHandlers) createAd(c echo.Context) error {
	ad := new(model.Ad)
	if err := c.Bind(ad); err != nil {
		return err
	}
	_, err := h.db.AddBook(ad)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, ad)
}

func healthCheckHandler(c echo.Context) error {
	return c.String(http.StatusOK, "ok")
}
