const bcrypt = require('bcrypt');
const User = require('../../models/user');

function list(req, res, next){
    let error = req.query.passwordError;
    res.render('pages/parametre/list', { layout: "auth", title: "Page paramètre", page: "Paramètre", error: error})
}

async function updatePassword(req, res, next){
    const{ oldPassword, newPassword, confirmNewPassword} = req.body;
    const isPasswordMatch = await bcrypt.compare(oldPassword, req.session.user.password);
    if(!isPasswordMatch){
        const messageError = encodeURIComponent('Encien mot de passe incorrect');
        res.redirect('/auth/parametre/?passwordError='+messageError);
    }else{
        if(newPassword.length < 8){
            const messageError = encodeURIComponent('Le mot de passe doit contenir un minimum de 8 caractères');
            res.redirect('/auth/parametre/?passwordError='+messageError);
        }else{
            if(newPassword !== confirmNewPassword){
                const messageError = encodeURIComponent('Le nouveau mot de passe et sa confirmation ne correspondent pas');
                res.redirect('/auth/parametre/?passwordError='+messageError);
            }else{
                const passwordHash = await bcrypt.hash(confirmNewPassword, 10);
                const dataPassword = {
                    password: passwordHash,
                    updatedAt: new Date()
                };
                await User.findByIdAndUpdate(req.session.user._id, dataPassword, {new: true});
                req.session.user = await User.findOne({_id: req.session.user._id}).lean();
                res.redirect('/auth/parametre');
            }
        }
    }
}

module.exports = {list, updatePassword};