<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link to="/" class="nav-item active" tag="li">
          <a class="nav-link">Vue Store</a>
        </router-link>
        <router-link to="/about" class="nav-item active" tag="li">
          <a class="nav-link">About</a>
        </router-link>
        <router-link to="/items" class="nav-item active" tag="li">
          <a class="nav-link">Products</a>
        </router-link>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <a
          class="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          data-toggle="modal"
          data-target="#login"
        >Login</a>
        <Login></Login>
      </form>
    </div>
  </nav>
</template>
<script>
import Login from '../front-view/Model'
export default {
  components: {
    Login
  }
}
</script>
