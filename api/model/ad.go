package model

type Ad struct {
	ID      int64  `json:"id"`
	Title   string `json:"title" validate:"required"`
	Content string `json:"content" validate:"required"`
}

func (a *Ad) UpdateFields(new *Ad) {
	a.Title = new.Title
	a.Content = new.Content
}
