import { getOwner } from 'discourse-common/lib/get-owner';

export default {
  setupComponent(attrs, component) {
    const controller = getOwner(this).lookup('controller:composer');
    component.set('audioValidation', controller.get('audioValidation'));
    controller.addObserver('audioValidation', () => {
      if (this._state === 'destroying') {
        return;
      }
      component.set('audioValidation', controller.get('audioValidation'));
    });
  },
};
