# Authorized and unauthorized routes

Want to use these components to guard certain routes?

Here is an example that you might use in `App.js`:

```
<UnauthenticatedRoute path="/login">
		<LoginComponent setIsAuthenticated={this.setIsUserLoggedIn} isAuthenticated={this.state.isUserLoggedIn}/>
</UnauthenticatedRoute>
<Route path={"/cart"} component={CartView} />
<UnauthenticatedRoute path={"/checkout"}>
		<CheckoutView isAuthenticated={this.state.isUserLoggedIn}/>
</UnauthenticatedRoute>
<Route path={"/login"}>
		<LoginComponent setIsAuthenticated={this.setIsUserLoggedIn} isAuthenticated={this.state.isUserLoggedIn}/>
</Route>
<Route path={"/"} render={() => <StoreViewComponent currency={this.state.currency} />} />
```

These components are heavily based on content found at [Serverless Stack website](https://serverless-stack.com/chapters/use-the-redirect-routes.html). Serverless stack uses functional components, whereas we use class components, in keeping with the rest of this lab.