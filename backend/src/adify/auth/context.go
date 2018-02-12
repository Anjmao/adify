package auth

import (
	"net/http"

	"adify/auth/clai
)

// Context context
type Context struct {
	*Auth
	Claims   *claims.Claims
	Provider Provider
	Request  *http.Request
	Writer   http.ResponseWriter
}


// FormValue get form value with name
func (context Context) FormValue(name string) string {
	return context.Request.Form.Get(name)
}
