module. exports = {
    eAdmin: function(req, res, next){
        if(req.isAuthenticated()) {
            return next()
        } else {
            req.flash("error_msg", "Realize o login para acessar página!")
            res.redirect('/login')
        }
    }
}