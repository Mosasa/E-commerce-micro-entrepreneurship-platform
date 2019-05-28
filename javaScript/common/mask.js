import component from '../../components/mask/mask';
let Mask = {};
Mask.install = function (Vue) {
  let MaskTpl = Vue.extend(component);
  let maskTpl = new MaskTpl();
  let tpl = maskTpl.$mount().$el;
  let maskParam = {};
 //  展示
  showMask = (param = {}) => {
    let box = param.box || 'body';
    maskTpl.coverStyle = param.coverStyle || '';
    window.$(box).append(tpl);
    maskParam = param;
    maskParam.showCallback && maskParam.showCallback();
  }
 // 隐藏
  hideMask = () => {
    window.$(tpl).remove();
    maskParam.hideCallback && maskParam.hideCallback();
  }
}
module.exports.showMask = showMask;
module.exports.hideMask = hideMask;
