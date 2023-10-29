$(document).ready(function(){
    $(".dropbtn-productos").hover(
        function(){
            $(".dropbtn-productos").css("border-bottom", "2px solid #00A84D"); // Cambia el color al hacer hover
        },
        function(){
            $(".dropbtn-productos").css("border-bottom", "0px");
        }
    );
    $(".productos").hover(
        function(){
            $(".dropbtn-productos").css("border-bottom", "2px solid #00A84D"); // Cambia el color al hacer hover
            $(".dropbtn-productos").css("border-radius", "0px");
        },
        function(){
            $(".dropbtn-productos").css("border-bottom", "0px"); // Revierte el cambio cuando el mouse sale
        }
    );

    $(".dropbtn-turnos").hover(
        function(){
            $(".dropbtn-turnos").css("border-bottom", "2px solid #00A84D"); // Cambia el color al hacer hover
        },
        function(){
            $(".dropbtn-turnos").css("border-bottom", "0px");
        }
    );
    $(".turnos").hover(
        function(){
            $(".dropbtn-turnos").css("border-bottom", "2px solid #00A84D"); // Cambia el color al hacer hover
            $(".dropbtn-turnos").css("border-radius", "0px");
        },
        function(){
            $(".dropbtn-turnos").css("border-bottom", "0px"); // Revierte el cambio cuando el mouse sale
        }
    );


    $(".dropbtn-ayuda").hover(
        function(){
            $(".dropbtn-ayuda").css("border-bottom", "2px solid #00A84D"); // Cambia el color al hacer hover
        },
        function(){
            $(".dropbtn-ayuda").css("border-bottom", "0px");
        }
    );
    $(".ayuda").hover(
        function(){
            $(".dropbtn-ayuda").css("border-bottom", "2px solid #00A84D"); // Cambia el color al hacer hover
            $(".dropbtn-ayuda").css("border-radius", "0px");
        },
        function(){
            $(".dropbtn-ayuda").css("border-bottom", "0px"); // Revierte el cambio cuando el mouse sale
        }
    );

});