package router

import (
	"go-rest-api/config"
	"go-rest-api/controller"
	"os"

	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func NewRouter(uc controller.IUserController, tc controller.ITaskController) *echo.Echo {
	e := echo.New()

	e.Use(middleware.CORSWithConfig(config.Middleware()))

	e.Use(middleware.CSRFWithConfig(config.CSRFConfig()))

	v1 := e.Group("/v1")

	v1.GET("/csrf", uc.CSRFToken)

	auth := v1.Group("/auth")
	auth.POST("/signup", uc.SignUp)
	auth.POST("/login", uc.Login)
	auth.POST("/logout", uc.LogOut)

	t := v1.Group("/tasks")
	t.Use(echojwt.WithConfig(echojwt.Config{
		SigningKey:  []byte(os.Getenv("JWT_SECRET")),
		TokenLookup: "cookie:token",
	}))
	t.GET("", tc.GetAllTasks)
	t.GET("/:taskId", tc.GetTaskById)
	t.POST("", tc.CreateTask)
	t.PUT("/:taskId", tc.UpdateTask)
	t.DELETE("/:taskId", tc.DeleteTask)

	return e
}
