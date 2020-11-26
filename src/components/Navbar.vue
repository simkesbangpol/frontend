<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">Sistem Informasi Pelaporan</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <!-- <b-navbar-nav>
                <b-nav-item href="#">Link</b-nav-item>
                <b-nav-item href="#" disabled>Disabled</b-nav-item>
            </b-navbar-nav> -->

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em><b-icon-person-circle class="mr-2"/>User</em>
                        </template>
                        <b-dropdown-item href="#"><b-icon-person-fill class="mr-2"/>Profil</b-dropdown-item>
                        <b-dropdown-item href="#"><b-icon-box-arrow-right class="mr-2"/>Keluar</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name:"Navbar"
}
</script>

<style>

</style>