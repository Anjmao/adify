package handler

import (
	"github.com/anjmao/adify/api/db"
	"github.com/anjmao/adify/api/model"
	"github.com/labstack/echo"
	"net/http"
)

func NewAdHandler(db db.AdsDatabase) *adHandler {
	return &adHandler{db: db}
}

type adHandler struct {
	db db.AdsDatabase
}

func (h *adHandler) GetAds(c echo.Context) error {
	filter := new(model.ListAdsFilter)
	filter.FromQueryParams(c.QueryParam("page"), c.QueryParam("term"), "", "")

	ads, err := h.db.ListAds(filter)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, ads)
}

func (h *adHandler) CreateAd(c echo.Context) error {
	ad := new(model.Ad)
	if err := c.Bind(ad); err != nil {
		return err
	}
	id, err := h.db.AddAd(ad)
	if err != nil {
		return err
	}
	ad.ID = id
	return c.JSON(http.StatusOK, ad)
}

func (h *adHandler) UpdateAd(c echo.Context) error {
	id, err := ParseInt64(c.Param("id"))
	if err != nil {
		return err
	}
	req := new(model.Ad)
	if err := c.Bind(req); err != nil {
		return err
	}
	if err = c.Validate(req); err != nil {
		return err
	}

	ad, err := h.db.GetAd(id)
	if err != nil {
		return err
	}
	ad.UpdateFields(req)
	if err := h.db.UpdateAd(ad); err != nil {
		return err
	}

	return c.JSON(http.StatusOK, ad)
}

func (h *adHandler) DeleteAd(c echo.Context) error {
	id, err := ParseInt64(c.Param("id"))
	if err != nil {
		return err
	}
	_, err = h.db.GetAd(id)
	if err != nil {
		return err
	}
	h.db.DeleteAd(id)
	return nil
}
