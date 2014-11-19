
$(document).foundation();
$(function() {

    loadAnimation("#SnowAnimation","svg/ski.svg", 8 , 4);
    loadAnimation("#SummerAnimation","svg/bike.svg", 7 , 3 );
    loadAnimation("#WalksAnimation","svg/man.svg",12, 6 );




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
        var p = new Snap();
        var allPaths = g.selectAll("g>g[id]")
        var myPathC = f.select(".path");;
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
                g.transform( 't' + parseInt(movePoint.x - 100 ) + ',' + parseInt( movePoint.y - 420 ) + 'r' + (movePoint.alpha + 90) + 's0.3');
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
