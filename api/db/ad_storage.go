package db

import (
	"cloud.google.com/go/datastore"
	"fmt"
	"github.com/anjmao/adify/api/model"
	"golang.org/x/net/context"
)

// datastoreDB persists books to Cloud Datastore.
// https://cloud.google.com/datastore/docs/concepts/overview
type datastoreDB struct {
	client *datastore.Client
}

type BookDatabase interface {
	// ListBooks returns a list of books, ordered by title.
	ListBooks() ([]*model.Ad, error)

	// ListBooksCreatedBy returns a list of books, ordered by title, filtered by
	// the user who created the book entry.
	ListBooksCreatedBy(userID string) ([]*model.Ad, error)

	// GetBook retrieves a book by its ID.
	GetBook(id int64) (*model.Ad, error)

	// AddBook saves a given book, assigning it a new ID.
	AddBook(b *model.Ad) (id int64, err error)

	// DeleteBook removes a given book by its ID.
	DeleteBook(id int64) error

	// UpdateBook updates the entry for a given book.
	UpdateBook(b *model.Ad) error

	// Close closes the database, freeing up any available resources.
	// TODO(cbro): Close() should return an error.
	Close()
}

// Ensure datastoreDB conforms to the BookDatabase interface.
var _ BookDatabase = &datastoreDB{}

func NewAdDatabase(client *datastore.Client) (BookDatabase, error) {
	ctx := context.Background()
	// Verify that we can communicate and authenticate with the datastore service.
	t, err := client.NewTransaction(ctx)
	if err != nil {
		return nil, fmt.Errorf("datastoredb: could not connect: %v", err)
	}
	if err := t.Rollback(); err != nil {
		return nil, fmt.Errorf("datastoredb: could not connect: %v", err)
	}
	return &datastoreDB{
		client: client,
	}, nil
}

// Close closes the database.
func (db *datastoreDB) Close() {
	// No op.
}

func (db *datastoreDB) datastoreKey(id int64) *datastore.Key {
	return datastore.IDKey("Book", id, nil)
}

// GetBook retrieves a book by its ID.
func (db *datastoreDB) GetBook(id int64) (*model.Ad, error) {
	ctx := context.Background()
	k := db.datastoreKey(id)
	book := &model.Ad{}
	if err := db.client.Get(ctx, k, book); err != nil {
		return nil, fmt.Errorf("datastoredb: could not get Book: %v", err)
	}
	book.ID = id
	return book, nil
}

// AddBook saves a given book, assigning it a new ID.
func (db *datastoreDB) AddBook(b *model.Ad) (id int64, err error) {
	ctx := context.Background()
	k := datastore.IncompleteKey("Book", nil)
	k, err = db.client.Put(ctx, k, b)
	if err != nil {
		return 0, fmt.Errorf("datastoredb: could not put Book: %v", err)
	}
	return k.ID, nil
}

// DeleteBook removes a given book by its ID.
func (db *datastoreDB) DeleteBook(id int64) error {
	ctx := context.Background()
	k := db.datastoreKey(id)
	if err := db.client.Delete(ctx, k); err != nil {
		return fmt.Errorf("datastoredb: could not delete Book: %v", err)
	}
	return nil
}

// UpdateBook updates the entry for a given book.
func (db *datastoreDB) UpdateBook(b *model.Ad) error {
	ctx := context.Background()
	k := db.datastoreKey(b.ID)
	if _, err := db.client.Put(ctx, k, b); err != nil {
		return fmt.Errorf("datastoredb: could not update Book: %v", err)
	}
	return nil
}

// ListBooks returns a list of books, ordered by title.
func (db *datastoreDB) ListBooks() ([]*model.Ad, error) {
	ctx := context.Background()
	books := make([]*model.Ad, 0)
	q := datastore.NewQuery("Book").
		Order("Title")

	keys, err := db.client.GetAll(ctx, q, &books)

	if err != nil {
		return nil, fmt.Errorf("datastoredb: could not list books: %v", err)
	}

	for i, k := range keys {
		books[i].ID = k.ID
	}

	return books, nil
}

// ListBooksCreatedBy returns a list of books, ordered by title, filtered by
// the user who created the book entry.
func (db *datastoreDB) ListBooksCreatedBy(userID string) ([]*model.Ad, error) {
	ctx := context.Background()
	if userID == "" {
		return db.ListBooks()
	}

	books := make([]*model.Ad, 0)
	q := datastore.NewQuery("Book").
		Filter("CreatedByID =", userID).
		Order("Title")

	keys, err := db.client.GetAll(ctx, q, &books)

	if err != nil {
		return nil, fmt.Errorf("datastoredb: could not list books: %v", err)
	}

	for i, k := range keys {
		books[i].ID = k.ID
	}

	return books, nil
}
