package authority

import (
	"html/template"
	"net/http"

	"adify/auth"
	"adify/roles"
)

var (
	// AccessDeniedFlashMessage access denied message
	AccessDeniedFlashMessage = template.HTML("Access Denied!")
)

// Authority authority struct
type Authority struct {
	*Config
}

// AuthInterface auth interface
type AuthInterface interface {
	auth.SessionStorerInterface
	GetCurrentUser(req *http.Request) interface{}
}

// Config authority config
type Config struct {
	Auth                AuthInterface
	Role                *roles.Role
	AccessDeniedHandler func(w http.ResponseWriter, req *http.Request)
}

// New initialize Authority
func New(config *Config) *Authority {
	if config == nil {
		config = &Config{}
	}

	if config.Auth == nil {
		panic("Auth should not be nil for Authority")
	}

	if config.Role == nil {
		config.Role = roles.Global
	}

	authority := &Authority{Config: config}

	//middlewares.Use(middlewares.Middleware{
	//	Name:        "authority",
	//	InsertAfter: []string{"session"},
	//	Handler: func(handler http.Handler) http.Handler {
	//		return authority.Middleware(handler)
	//	},
	//})
	return authority
}

// Authorize authorize specfied roles or authenticated user to access wrapped handler
func (authority *Authority) Authorize(roles ...string) func(http.Handler) http.Handler {
	return func(handler http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
			var currentUser interface{}

			// Get current user from request
			currentUser = authority.Auth.GetCurrentUser(req)

			if (len(roles) == 0 && currentUser != nil) || authority.Role.HasRole(req, currentUser, roles...) {
				handler.ServeHTTP(w, req)
				return
			}

			authority.AccessDeniedHandler(w, req)
		})
	}
}
