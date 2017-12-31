package db

import (
	"fmt"

	"cloud.google.com/go/datastore"
	"github.com/anjmao/adify/api/model"
	"golang.org/x/net/context"
)

// datastoreDB persists books to Cloud Datastore.
// https://cloud.google.com/datastore/docs/concepts/overview
type datastoreDB struct {
	client *datastore.Client
}

type AdsDatabase interface {
	ListAds() ([]*model.Ad, error)

	ListAdsCreatedBy(userID string) ([]*model.Ad, error)

	GetAd(id int64) (*model.Ad, error)

	AddAd(b *model.Ad) (id int64, err error)

	DeleteAd(id int64) error

	UpdateAd(b *model.Ad) error

	Close()
}

// Ensure datastoreDB conforms to the AdsDatabase interface.
var _ AdsDatabase = &datastoreDB{}

const adsListPageLimit = 2

func NewAdDatabase(client *datastore.Client) (AdsDatabase, error) {
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
	db.client.Close()
}

func (db *datastoreDB) datastoreKey(id int64) *datastore.Key {
	return datastore.IDKey("Ad", id, nil)
}

// GetAd retrieves a book by its ID.
func (db *datastoreDB) GetAd(id int64) (*model.Ad, error) {
	ctx := context.Background()
	k := db.datastoreKey(id)
	book := &model.Ad{}
	if err := db.client.Get(ctx, k, book); err != nil {
		return nil, fmt.Errorf("datastoredb: could not get Book: %v", err)
	}
	book.ID = id
	return book, nil
}

// AddAd saves a given ad, assigning it a new ID.
func (db *datastoreDB) AddAd(b *model.Ad) (id int64, err error) {
	ctx := context.Background()
	k := datastore.IncompleteKey("Ad", nil)
	k, err = db.client.Put(ctx, k, b)
	if err != nil {
		return 0, fmt.Errorf("datastoredb: could not put ad: %v", err)
	}
	return k.ID, nil
}

// DeleteAd removes a given ad by its ID.
func (db *datastoreDB) DeleteAd(id int64) error {
	ctx := context.Background()
	k := db.datastoreKey(id)
	if err := db.client.Delete(ctx, k); err != nil {
		return fmt.Errorf("datastoredb: could not delete ad: %v", err)
	}
	return nil
}

// UpdateAd updates the entry for a given ad.
func (db *datastoreDB) UpdateAd(b *model.Ad) error {
	ctx := context.Background()
	k := db.datastoreKey(b.ID)
	if _, err := db.client.Put(ctx, k, b); err != nil {
		return fmt.Errorf("datastoredb: could not update ad: %v", err)
	}
	return nil
}

// ListAds returns a list of ads, ordered by title.
func (db *datastoreDB) ListAds() ([]*model.Ad, error) {
	ctx := context.Background()
	ads := make([]*model.Ad, 0)
	q := datastore.NewQuery("Ad").Limit(adsListPageLimit).Order("Title")

	keys, err := db.client.GetAll(ctx, q, &ads)

	if err != nil {
		return nil, fmt.Errorf("datastoredb: could not list ads: %v", err)
	}

	for i, k := range keys {
		ads[i].ID = k.ID
	}

	return ads, nil
}

// ListAdsCreatedBy returns a list of ads, ordered by title, filtered by
// the user who created the ad entry.
func (db *datastoreDB) ListAdsCreatedBy(userID string) ([]*model.Ad, error) {
	ctx := context.Background()
	if userID == "" {
		return db.ListAds()
	}

	ads := make([]*model.Ad, 0)
	q := datastore.NewQuery("Ad").
		Filter("CreatedByID =", userID).
		Order("Title")

	keys, err := db.client.GetAll(ctx, q, &ads)

	if err != nil {
		return nil, fmt.Errorf("datastoredb: could not list ads: %v", err)
	}

	for i, k := range keys {
		ads[i].ID = k.ID
	}

	return ads, nil
}
