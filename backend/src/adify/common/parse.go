package common

import (
	"errors"
	"strconv"
)

func ParseInt64(val string) (int64, error) {
	i, err := strconv.ParseInt(val, 10, 64)
	if err != nil {
		return 0, errors.New("cannot convert string to int64")
	}
	return i, nil
}

func ParseInt(val string) (int, error) {
	i, err := strconv.ParseInt(val, 10, 32)
	if err != nil {
		return 0, errors.New("cannot convert string to int")
	}
	return int(i), nil
}
