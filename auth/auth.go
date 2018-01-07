package main

import (
	"html/template"
	"io"
	"net/http"

	"github.com/labstack/echo"
)

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func init() {
	e.Renderer = &Template{
		templates: template.Must(template.ParseGlob("views/index.html")),
	}
	e.GET("/", func(c echo.Context) error {
		return c.Render(http.StatusOK, "index", "World")
	})
}
