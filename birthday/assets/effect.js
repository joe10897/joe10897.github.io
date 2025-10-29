$(window).load(function(){
	$('.loading').fadeOut('fast');
	$('.container').fadeIn('fast');
});

$(document).ready(function(){
    var vw;
    $(window).resize(function(){
        vw = $(window).width()/2;
        $('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
        $('#b11').animate({top:240, left: vw-350},500);
        $('#b22').animate({top:240, left: vw-250},500);
        $('#b33').animate({top:240, left: vw-150},500);
        $('#b44').animate({top:240, left: vw-50},500);
        $('#b55').animate({top:240, left: vw+50},500);
        $('#b66').animate({top:240, left: vw+150},500);
        $('#b77').animate({top:240, left: vw+250},500);
    });

    var currentStage = 0; // 0: initial, 1: lights, 2: music, 3: banner, 4: balloons, 5: cake, 6: candle, 7: wish, 8: story

    // Function to handle each stage of the animation
    function nextStage() {
        currentStage++;
        switch(currentStage) {
            case 1: // Turn On Lights
                $('#bulb_yellow').addClass('bulb-glow-yellow');
                $('#bulb_red').addClass('bulb-glow-red');
                $('#bulb_blue').addClass('bulb-glow-blue');
                $('#bulb_green').addClass('bulb-glow-green');
                $('#bulb_pink').addClass('bulb-glow-pink');
                $('#bulb_orange').addClass('bulb-glow-orange');
                $('body').addClass('peach');
                break;
            case 2: // Play Music
                var audio = $('.song')[0];
                audio.play();
                $('#bulb_yellow').addClass('bulb-glow-yellow-after');
                $('#bulb_red').addClass('bulb-glow-red-after');
                $('#bulb_blue').addClass('bulb-glow-blue-after');
                $('#bulb_green').addClass('bulb-glow-green-after');
                $('#bulb_pink').addClass('bulb-glow-pink-after');
                $('#bulb_orange').addClass('bulb-glow-orange-after');
                $('body').css('backgroud-color','#FFF');
                $('body').addClass('peach-after');
                break;
            case 3: // Let's Decorate (Banner Coming)
                $('.bannar').addClass('bannar-come');
                break;
            case 4: // Fly With Balloons
                $('.balloon-border').animate({top:-500},8000);
                $('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
                $('#b2,#b3,#b6').addClass('balloons-rotate-behaviour-two');
                loopOne();
                loopTwo();
                loopThree();
                loopFour();
                loopFive();
                loopSix();
                loopSeven();
                break;
            case 5: // Most Delicious Cake Ever (Cake Fade In)
                $('.cake').fadeIn('slow');
                break;
            case 6: // Light Candle
                $('.fuego').fadeIn('slow');
                break;
            case 7: // Happy Birthday (Wish Message)
                vw = $(window).width()/2;
                $('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
                $('#b1').attr('id','b11');
                $('#b2').attr('id','b22')
                $('#b3').attr('id','b33')
                $('#b4').attr('id','b44')
                $('#b5').attr('id','b55')
                $('#b6').attr('id','b66')
                $('#b7').attr('id','b77')
                $('#b11').animate({top:240, left: vw-350},500);
                $('#b22').animate({top:240, left: vw-250},500);
                $('#b33').animate({top:240, left: vw-150},500);
                $('#b44').animate({top:240, left: vw-50},500);
                $('#b55').animate({top:240, left: vw+50},500);
                $('#b66').animate({top:240, left: vw+150},500);
                $('#b77').animate({top:240, left: vw+250},500);
                $('.balloons').css('opacity','0.9');
                $('.balloons h2').fadeIn(3000);
                break;
            case 8: // A message for you (Story)
                $('.cake').fadeOut('fast').promise().done(function(){
                    $('.message').fadeIn('slow');
                });
                var i;
                function msgLoop (i) {
                    $("p:nth-child("+i+")").fadeOut('slow').delay(800).promise().done(function(){
                        i=i+1;
                        $("p:nth-child("+i+")").fadeIn('slow').delay(1000);
                        if(i==50){ // This condition seems arbitrary, might need adjustment based on actual content
                            $("p:nth-child(49)").fadeOut('slow').promise().done(function () {
                                $('.cake').fadeIn('fast');
                            });
                        } else {
                            msgLoop(i);
                        }
                    });
                }
                msgLoop(0);
                break;
            default:
                // Optionally loop or end the sequence
                break;
        }
    }

    // Attach a single click handler to the body
    $('body').on('click', function() {
        nextStage();
    });

    // Original loop functions for balloons
    function loopOne() {
        var randleft = 1000*Math.random();
        var randtop = 500*Math.random();
        $('#b1').animate({left:randleft,bottom:randtop},10000,function(){
            loopOne();
        });
    }
    function loopTwo() {
        var randleft = 1000*Math.random();
        var randtop = 500*Math.random();
        $('#b2').animate({left:randleft,bottom:randtop},10000,function(){
            loopTwo();
        });
    }
    function loopThree() {
        var randleft = 1000*Math.random();
        var randtop = 500*Math.random();
        $('#b3').animate({left:randleft,bottom:randtop},10000,function(){
            loopThree();
        });
    }
    function loopFour() {
        var randleft = 1000*Math.random();
        var randtop = 500*Math.random();
        $('#b4').animate({left:randleft,bottom:randtop},10000,function(){
            loopFour();
        });
    }
    function loopFive() {
        var randleft = 1000*Math.random();
        var randtop = 500*Math.random();
         $('#b5').animate({left:randleft,bottom:randtop},10000,function(){
            loopFive();
        });
    }
    function loopSix() {
        var randleft = 1000*Math.random();
        var randtop = 500*Math.random();
        $('#b6').animate({left:randleft,bottom:randtop},10000,function(){
            loopSix();
        });
    }
    function loopSeven() {
        var randleft = 1000*Math.random();
        var randtop = 500*Math.random();
        $('#b7').animate({left:randleft,bottom:randtop},10000,function(){
            loopSeven();
        });
    }
});