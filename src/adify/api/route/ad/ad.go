package ad

import (
	"net/http"

	"github.com/anjmao/adify/api/common"
	"github.com/anjmao/adify/api/db"
	"github.com/anjmao/adify/api/model"
	"github.com/anjmao/adify/api/route"
	"github.com/labstack/echo"
)

func Register(e *echo.Echo, db db.AdsDatabase) {
	s := newAdService(db)
	g := e.Group("/ads")
	g.GET("/list", s.GetAds)
	g.POST("", s.CreateAd)
	g.PUT("/:id", s.UpdateAd)
	g.DELETE("/:id", s.DeleteAd)
}

func newAdService(db db.AdsDatabase) *adService {
	return &adService{db: db}
}

type adService struct {
	db db.AdsDatabase
}

type CreateAdRequest struct {
	ID      int64  `json:"id"`
	Title   string `json:"title" validate:"required"`
	Content string `json:"content" validate:"required"`
}

type CreateAdResponse struct {
	ID int64 `json:"id"`
}

type UpdateAdRequest struct {
	Title   string `json:"title" validate:"required"`
	Content string `json:"content" validate:"required"`
}

type Ad struct {
	ID      int64  `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

type GetAdsRequest struct {
	Page int `query:"page"`
}

type GetAdsResponse struct {
	Ads []Ad `json:"ads"`
}

func (s *adService) GetAds(c echo.Context) error {
	req := new(GetAdsRequest)
	if err := c.Bind(req); err != nil {
		return err
	}

	ads, err := s.db.ListAds()
	if err != nil {
		return err
	}

	rsp := new(GetAdsResponse)
	for _, ad := range ads {
		rsp.Ads = append(rsp.Ads, Ad{ID: ad.ID, Title: ad.Title, Content: ad.Content})
	}

	return c.JSON(http.StatusOK, rsp)
}

func (s *adService) CreateAd(c echo.Context) error {
	req := new(CreateAdRequest)
	if err := c.Bind(req); err != nil {
		return err
	}
	id, err := s.db.AddAd(&model.Ad{Title: req.Title, Content: req.Content})
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, CreateAdResponse{ID: id})
}

func (s *adService) UpdateAd(c echo.Context) error {
	id, err := common.ParseInt64(c.Param("id"))
	if err != nil {
		return err
	}
	req := new(UpdateAdRequest)
	if err := c.Bind(req); err != nil {
		return err
	}
	if err = c.Validate(req); err != nil {
		return err
	}

	ad, err := s.db.GetAd(id)
	if err != nil {
		return err
	}

	ad.Title = req.Title
	ad.Content = req.Content
	if err := s.db.UpdateAd(ad); err != nil {
		return err
	}

	return route.OK(c)
}

func (s *adService) DeleteAd(c echo.Context) error {
	id, err := common.ParseInt64(c.Param("id"))
	if err != nil {
		return err
	}
	_, err = s.db.GetAd(id)
	if err != nil {
		return err
	}
	s.db.DeleteAd(id)
	return route.OK(c)
}
