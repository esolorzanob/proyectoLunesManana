var usuarioGuardado = sessionStorage.getItem('usuarioLogueado');
if (usuarioGuardado) {
    usuarioGuardado = JSON.parse(usuarioGuardado);
    $('#login').text(usuarioGuardado.usuario);
    //empieza a crear menu
    $('#botonLogin').addClass('dropdown');
    $('#login').addClass('dropdown-toggle');
    $('#login').attr('href', '#');
    $('#login').attr('data-toggle', 'dropdown');
    $('#login').attr('aria-haspopup', 'true');
    $('#login').attr('aria-expanded', 'false');
    $('<div class="dropdown-menu dropdown-menu-right" aria-labelledby="login"><a class="dropdown-item" href="miperfil.html">Mi Perfil</a><a class="dropdown-item" href="mispedidos.html">Mis Pedidos</a><a class="dropdown-item" href="#" onclick="logout()">Cerrar Sesión</a></div>').appendTo('#botonLogin');
}
