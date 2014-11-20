
$(document).foundation();
$(function() {

    loadAnimation("#SnowAnimation","svg/ski.svg", 8 , 2);
    loadAnimation("#SummerAnimation","svg/bike.svg", 7 , 3 );
    loadAnimation("#WalksAnimation","svg/man.svg",16, 2 );




    function loadAnimation(id, svgPath, speed, count) {
        var s = Snap(id);
        Snap.load(svgPath, function (f) {
            for(var i = 0; i < count; i++)
            {
               new Person(f,s,speed,i/count);
            }
        });
    }



    function Person (f, mainSVG, speed, delay) {
        var active = 0;
        var g = f.select("g").clone();
        var allPaths = g.selectAll("g>g[id]")
        var myPathC = f.select("#path");;
//        mainSVG.append(myPathC.clone());
        var lenC = myPathC.getTotalLength();
        var movePoint = myPathC.getPointAtLength( 0 );

        setTimeout( function() {
            mainSVG.append(g);
            animate();
            animateBetween();
        },delay * lenC * speed);

        function animate(){
            Snap.animate(0, lenC, function( value ) {
                movePoint = myPathC.getPointAtLength( value );
                g.transform( 't' + parseInt(movePoint.x  ) + ',' + parseInt( movePoint.y  ) + 'r' + (movePoint.alpha )  );
            }, lenC* speed,mina.easeout,animate);

        }

        function clear(){
            for(var i = 0; i < allPaths.length; i++)
            {
                allPaths[i].attr({"opacity": 0});
            }
        }

        function animateBetween( ){
            clear();
            setInterval(function() {
                    clear();
                allPaths[active].attr({"opacity": 1});
                active = (active + 1)%allPaths.length;
            }, 250)
        }

    }



});
