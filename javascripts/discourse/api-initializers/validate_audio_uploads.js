import EmberObject from '@ember/object';
import discourseComputed from 'discourse-common/utils/decorators';
import { apiInitializer } from 'discourse/lib/api';
import I18n from 'I18n';

export default apiInitializer('0.11.1', (api) => {
  api.modifyClass('controller:composer', {
    pluginId: 'discourse-validate-audio',

    @discourseComputed('model', 'lastValidatedAt', 'model.categoryId')
    audioValidation(model, lastValidatedAt, category) {
      const categoriesToValidate = settings.categories.split('|');
      const allowedAudioFiles = settings.allowed_audio_files.split('|');

      if (category == null || undefined) {
        return;
      }

      const categoryId = category.toString();

      if (categoriesToValidate.includes(categoryId)) {
        if (allowedAudioFiles.every((f) => !model.reply.includes(f))) {
          return EmberObject.create({
            failed: true,
            reason: I18n.t(themePrefix('composer.error.audio_required')),
            lastShownAt: lastValidatedAt,
          });
        }
      }
    },

    save() {
      if (!this.get('audioValidation')) {
        this._super(...arguments);
      } else {
        this.set('lastValidatedAt', Date.now());
      }
    },
  });
});
