
//tabledog

(function($) 
{
	$.fn.extend(
	{ 
		shotPut: function(options) 
		{
 			var $list = $(this);
 			
    		var defaults = 
    		{
    			orientation   : 'vertical',
				justification : 'top',
				equalWidth    : 'true',
				equalHeight   : 'true',
            	fadeOutSpeed  : 500,
            	fadeInSpeed   : 500,
            	moveSpeed     : 500,
            	showTime      : 1000
            };
                		
			var settings = $.extend(defaults, options);
 

        	return this.each(function() 
        	{
 				var liWidth = 0;
 				var liHeight = 0;
				var clicked = false;
        		var activePage;
				          
				$list.children('li').each(function() 
				{                 
      	            var $this = $(this);

            	    if ($this.css('position')!='relative' || $(this).css('position')!='absolute')
            	    { 
                	    $this.css('position','relative');
                    } 
                       
                    if ($this.width() > liWidth) 
                    {
                    	liWidth = $this.width();
                    }
				                               
				})
				.addClass('fader')
				.css('cursor', 'pointer');
				               	    

				//$list.children('li').css('width',liWidth);

				       
				$list.mouseleave(function() 
				{         
					fadeWipe();
				});
				
				
				function fadeOn() 
				{
					$('.fader').click(function() 
					{ 
				        var $this = $(this)
				 
                       	if ($this.hasClass('focus')) {return;}
                              
                       	clicked = true;
				 
                   		removeFocus($('.focus'));
                   		setFocus($this);
				
				        var ref = $this.children('a').attr('href');
				 
				        $(activePage).fadeOut(defaults.fadeOutSpeed, function() 
				        {
                            $(ref).fadeIn(defaults.fadeInSpeed);
                            activePage = ref;
				        });
				 
				        fadeWipe($this);
				    })
					.css('cursor', 'pointer')
				    .stop()
				    .fadeTo(defaults.fadeInSpeed, 1)
        		}
        			
        			
    			function fadeWipe(obj) 
    			{
					$('.fader').unbind('click')
				    .css('cursor', 'default')
				    .stop()
				    .fadeTo(defaults.fadeOutSpeed,0,function() 
				    {                      
                   		if(clicked) 
                   		{
                           switchObjects($('.focus'),$('.switcher'));
                           clicked = false;
                           $('.switcher').removeClass('switcher');
                   		}
	               	});
    			}
        			
        			
    			function setFocus(obj) 
    			{
			        obj.removeClass('fader')
			        .addClass('focus')
			        .mouseenter(function() 
			        {
			            fadeOn();
			        });
    			}
				 
				 
				function removeFocus(obj) 
				{
					obj.removeClass('focus')
				    .addClass('fader')
				    .addClass('switcher')
				    .unbind('mouseenter');
        		}
        			
        			
        		function switchObjects(obj1,obj2) 
        		{ 
					//if the two objects are the same, quit
				 
			        if (obj1.hasClass('focus') == obj2.hasClass('focus')) {return;}
			 
			 
			        var oneOff = obj1.offset();
			        var oneDirectionY = "-"; //lol...one direction
			              
			        var twoOff = obj2.offset();
			        var twoDirectionY = "-";
			              
			        var movementTotalY = 0;
			              
			        if (oneOff.top <= twoOff.top) 
			        {      
		                oneDirectionY = "+";
		                movementTotalY = twoOff.top - oneOff.top;
			        } 
			        else 
			        {      
		                twoDirectionY = "+";
		                movementTotalY = oneOff.top - twoOff.top;
			        }
			              
			        var oneDirectionX = "-"; //lol...one direction again
			        var twoDirectionX = "-";
			              
			        var movementTotalX = 0;
			              
			        if (oneOff.left <= twoOff.left) 
			        {
		                oneDirectionX = "+";
		                movementTotalX = twoOff.left - oneOff.left;
			        } 
			        else 
			        {
		                twoDirectionX = "+";
		                movementTotalX = oneOff.left - twoOff.left;
			        }
				              
				    //alert($list.first('li').text());
				        
			        obj1.animate(
			        { 
			        	top : oneDirectionY+"="+movementTotalY+"px",
			            left : oneDirectionX+"="+movementTotalX+"px"
			        },defaults.moveSpeed,                  
				    function() 
				    {                     
                  		//$(.fader).first().insertAfter($('.focus');
                  		//alert($list.first('li').text());
				    });
				                       
				    obj2.animate(
				   	{ 
				   		top : twoDirectionY+"="+movementTotalY+"px",
				    	left : twoDirectionX+"="+movementTotalX+"px"
				    },0);
				       
        		}

        			
    			if (defaults.justification == 'top') 
    			{
    				setFocus($('.fader').first());
    				
    			}
    			else
    			{ 
    				if (defaults.justification == 'bottom')
    				{
    					setFocus($('.fader').last());
    				}
    			}
			                   
				$('.fader').delay(defaults.showTime).fadeTo(defaults.fadeOutSpeed,0);
			 
				$('.page').hide();
			 
		        activePage = $('.focus').children('a').attr('href');
			 
    			$(activePage).show();
        			
 			});
 			
        }
        	
	});
	
}) (jQuery);

