package auth

import (
	"net/http"
	"time"

	"github.com/jinzhu/gorm"
	"adify/auth/claims"
    "reflect"
    "net/url"
)

// CurrentUser context key to get current user from Request
const CurrentUser string = "current_user"

func ModelType(value interface{}) reflect.Type {
    reflectType := reflect.Indirect(reflect.ValueOf(value)).Type()

    for reflectType.Kind() == reflect.Ptr || reflectType.Kind() == reflect.Slice {
        reflectType = reflectType.Elem()
    }

    return reflectType
}

// GetCurrentUser get current user from request
func (auth *Auth) GetCurrentUser(req *http.Request) interface{} {
	if currentUser := req.Context().Value(CurrentUser); currentUser != nil {
		return currentUser
	}

	claims, err := auth.SessionStorer.Get(req)
	if err == nil {
		context := &Context{Auth: auth, Claims: claims, Request: req}
		if user, err := auth.UserStorer.Get(claims, context); err == nil {
			return user
		}
	}

	return nil
}

func GetAbsURL(req *http.Request) url.URL {
    var result url.URL

    if req.URL.IsAbs() {
        return *req.URL
    }

    if domain := req.Header.Get("Origin"); domain != "" {
        parseResult, _ := url.Parse(domain)
        result = *parseResult
    }

    result.Parse(req.RequestURI)
    return result
}

// GetDB get db from request
func (auth *Auth) GetDB(request *http.Request) *gorm.DB {
	db := request.Context().Value(utils.ContextDBName)
	if tx, ok := db.(*gorm.DB); ok {
		return tx
	}
	return auth.Config.DB
}

// Login sign user in
func (auth *Auth) Login(w http.ResponseWriter, req *http.Request, claimer claims.ClaimerInterface) error {
	claims := claimer.ToClaims()
	now := time.Now()
	claims.LastLoginAt = &now

	return auth.SessionStorer.Update(w, req, claims)
}

// Logout sign current user out
func (auth *Auth) Logout(w http.ResponseWriter, req *http.Request) {
	auth.SessionStorer.Delete(w, req)
}
