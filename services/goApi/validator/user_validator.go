package validator

import (
	"go-rest-api/model"

	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
)

type IUserValidator interface {
	UserSignUpValidate(user model.User) error
	UserLoginValidate(user model.User) error
}

type userValidator struct{}

func NewUserValidator() IUserValidator {
	return &userValidator{}
}

func (uv *userValidator) UserSignUpValidate(user model.User) error {
	return validation.ValidateStruct(&user,
		validation.Field(
			&user.Email,
			validation.Required.Error("email is required"),
			validation.RuneLength(1, 100).Error("email limit 100 characters"),
			is.Email.Error("email is not valid"),
		),
		validation.Field(
			&user.Name,
			validation.Required.Error("name is required"),
			validation.RuneLength(1, 50).Error("name limit 50 characters"),
		),
		validation.Field(
			&user.Password,
			validation.Required.Error("password is required"),
			validation.RuneLength(8, 100).Error("password min 8 limit 100 characters"),
		),
	)
}

func (uv *userValidator) UserLoginValidate(user model.User) error {
	return validation.ValidateStruct(&user,
		validation.Field(
			&user.Email,
			validation.Required.Error("email is required"),
		),
		validation.Field(
			&user.Password,
			validation.Required.Error("password is required"),
			validation.RuneLength(8, 100).Error("password min 8 limit 100 characters"),
		),
	)
}
