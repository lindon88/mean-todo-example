/**
 * Created by Lindon on 11/27/2016.
 */
(function () {
    "use strict";

    angular
        .module("app.formEngine", [])
        .config(config);

    config.$inject = ["schemaFormProvider", "schemaFormDecoratorsProvider", "sfPathProvider"];

    /**
     * Form engine config method
     * @param schemaFormProvider
     * @param schemaFormDecoratorsProvider
     * @param sfPathProvider
     */
    function config(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {
        schemaFormDecoratorsProvider.addMapping(
            'bootstrapDecorator',
            'combo-box',
            'form-engine/decorators/combo-box.view.html'
        );

        schemaFormDecoratorsProvider.addMapping(
            'bootstrapDecorator',
            'data-time-picker',
            'form-engine/decorators/date-time-picker.view.html'
        );

        schemaFormDecoratorsProvider.addMapping(
            'bootstrapDecorator',
            'action-button',
            'form-engine/decorators/action-button.view.html'
        );

        schemaFormDecoratorsProvider.addMapping(
            'bootstrapDecorator',
            'action-link',
            'form-engine/decorators/action-link.view.html'
        );
    }
})();