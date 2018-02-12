function login() {
    var usuario = {};
    usuario.usuario = $('#username').val();
    usuario.password = $('#pass').val();
    usuario.metodo = "select";
    $.ajax({
        url: "../php/usuario.php",
        method: "POST",
        data: usuario,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (usuario_response) {
            if (usuario_response == "Error") {
                $('#mensaje').text("El usuario digitado no existe");
            } else {
                var usuarioGuardado = JSON.parse(usuario_response);
                if (usuarioGuardado.password == usuario.password) {
                    sessionStorage.setItem("usuarioLogueado", usuario_response);
                    if (usuarioGuardado.rol == '0') {
                        window.location.href = "admin.html";
                    } else {
                        window.location.href = "index.html";
                    }
                } else {
                    $('#mensaje').text("El password es incorrecto");
                }
            }
        }
    });
    return false;
}

function logout() {
    sessionStorage.removeItem('usuarioLogueado');
    window.location.href = 'index.html';
}
function registro() {
    var usuario = {
        usuario: $('#username').val(),
        password: $('#pass').val(),
        nombre: $('#nombre').val(),
        apellidos: $('#apellidos').val(),
        correo: $('#correo').val(),
        direccion: $('#direccion').val(),
        telefono: $('#telefono').val(),
        rol: '1',
        metodo: 'registro'
    }
    $.ajax({
        url: "../php/usuario.php",
        method: "POST",
        data: usuario,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (usuario_response) {
            if (usuario_response == 'Exito') {
                alert('Se ha registrado con éxito!');
                window.location.href = 'login.html';
            } else {
                alert('Se ha producido un error al registrarse, inténtelo de nuevo');
            }
        }
    });
    return false;
}

function traerUsuarioMiPerfil() {
    var usuario = {
        id: JSON.parse(sessionStorage.getItem('usuarioLogueado')).idusuarios,
        metodo: "traerUsuario"
    }
    $.ajax({
        url: "../php/usuario.php",
        method: "POST",
        data: usuario,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (usuario_response) {
            var usuarioGuardado = JSON.parse(usuario_response);
            $('#nombre').text(usuarioGuardado.nombre + " " + usuarioGuardado.apellidos);
            $('#correo').append(usuarioGuardado.correo);
            $('#telefono').append(usuarioGuardado.telefono || 'No especificado')
            $('#direccion').append(usuarioGuardado.direccion || 'No especificado');
            $('#usuario').append(usuarioGuardado.usuario);
        }
    });
}

function traerUsuarioEditar() {
    var usuario = {
        id: JSON.parse(sessionStorage.getItem('usuarioLogueado')).idusuarios,
        metodo: "traerUsuario"
    }
    $.ajax({
        url: "../php/usuario.php",
        method: "POST",
        data: usuario,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (usuario_response) {
            usuarioGuardado = JSON.parse(usuario_response);
            $('#username').val(usuarioGuardado.usuario);
            $('#pass').val(usuarioGuardado.password);
            $('#nombre').val(usuarioGuardado.nombre);
            $('#apellidos').val(usuarioGuardado.apellidos);
            $('#correo').val(usuarioGuardado.correo);
            $('#direccion').val(usuarioGuardado.direccion);
            $('#telefono').val(usuarioGuardado.telefono);
            $('#idusuarios').val(usuarioGuardado.idusuarios);
        }
    });
}

function editarUsuario() {
    var usuario = {
        usuario: $('#username').val(),
        password: $('#pass').val(),
        nombre: $('#nombre').val(),
        apellidos: $('#apellidos').val(),
        correo: $('#correo').val(),
        direccion: $('#direccion').val(),
        telefono: $('#telefono').val(),
        idusuarios: $('#idusuarios').val(),
        metodo: 'editar'
    }
    $.ajax({
        url: "../php/usuario.php",
        method: "POST",
        data: usuario,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (usuario_response) {
            if (usuario_response == 'Exito') {
                alert('Se ha editado con éxito!');
                window.location.href = 'miperfil.html';
            } else {
                alert('Se ha producido un error al editar, inténtelo de nuevo');
            }
        }
    });
    return false;
}