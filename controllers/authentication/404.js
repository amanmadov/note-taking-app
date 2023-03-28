exports.getPageNotFound = async (req, res) => {
    res.render('layouts/authentication/404', { layout: false, docTitle: 'Page Not Found' });
}