define([
    "common/view"  
], 

function (view)
{

    // ---------------------------------------------------------------
    //
    // PAGE INDEX
    //
    // ---------------------------------------------------------------

    var constructor = function ()
    {
        this.oView = view;
        this.init();
    };

    var methods =
    {    
        // --------------------------------------------------------------
        // METHODS
        // --------------------------------------------------------------
        
        // ______________________________________________________________
        //                                                           init
        init: function()
        {           
            console.log(" * <index>");
            this.preloadImages();
            this.assignListeners();
        },

        // ______________________________________________________________
        //                                                  preloadImages
        preloadImages: function()
        {          
            // var str = this.oGlobalModel.PATH_RELATIVE + "Content/images/desktop/button-red_hover.png";
            // window.helpers.preloadImage(str);
        },


        // ______________________________________________________________
        //                                                assignListeners
        assignListeners: function()
        {          
            var self = this;

            window.tEvent.addListener(window.tEvent.eventStr.EVENT_LOAD_INDEX, function(evt)
            {
                self.onPageLoad();   
            });            
        },

        // ______________________________________________________________
        //                                         assignDynamicListeners
        assignDynamicListeners: function()
        {          
            var self = this;
        },

        


        // --------------------------------------------------------------
        // HELPERS
        // --------------------------------------------------------------


        // --------------------------------------------------------------
        // EVENTS
        // --------------------------------------------------------------
        // ______________________________________________________________
        //                                                     onPageLoad
        onPageLoad: function()
        {   
            console.log(" * <index.onPageLoad>");
        }

    };

    var Class = constructor;
    Class.prototype = methods;
   
    return (Class);     
   
});