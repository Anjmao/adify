package route

import (
	"net/http"

	"github.com/labstack/echo"
)

func OK(c echo.Context) error {
	r := c.Response()
	r.Status = http.StatusOK
	r.Flush()
	return nil
}
