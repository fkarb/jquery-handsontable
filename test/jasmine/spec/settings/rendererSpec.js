describe('settings', function () {
  describe('renderer', function () {
    var id = 'testContainer';

    beforeEach(function () {
      this.$container = $('<div id="' + id + '"></div>').appendTo('body');
    });

    afterEach(function () {
      if (this.$container) {
        destroy();
        this.$container.remove();
      }
    });

    describe('defined in constructor', function () {
      it('should use text renderer by default', function () {
        var originalTextRenderer = Handsontable.TextCell.renderer;
        spyOn(Handsontable.TextCell, 'renderer');
        Handsontable.renderers.registerRenderer('text', Handsontable.TextCell.renderer);

        handsontable();
        expect(Handsontable.TextCell.renderer).toHaveBeenCalled();

        Handsontable.renderers.registerRenderer('text', originalTextRenderer);

      });

      it('should use renderer from predefined string', function () {

        var originalTextRenderer = Handsontable.renderers.TextRenderer;
        spyOn(Handsontable.renderers, 'TextRenderer');
        Handsontable.renderers.registerRenderer('text', Handsontable.renderers.TextRenderer);

        var originalCheckboxRenderer = Handsontable.renderers.CheckboxRenderer;
        spyOn(Handsontable.renderers, 'CheckboxRenderer');
        Handsontable.renderers.registerRenderer('checkbox', Handsontable.renderers.CheckboxRenderer);


        handsontable({
          columns: [
            {
              renderer: 'checkbox'
            }
          ]
        });
        expect(Handsontable.renderers.TextRenderer).not.toHaveBeenCalled();
        expect(Handsontable.renderers.CheckboxRenderer).toHaveBeenCalled();

        Handsontable.renderers.registerRenderer('text', originalTextRenderer);
        Handsontable.renderers.registerRenderer('checkbox', originalCheckboxRenderer);
      });

      it('should use renderer from custom function', function () {
        var called = false;

        function myRenderer() {
          called = true;
        }

        handsontable({
          columns: [
            {
              renderer: myRenderer
            }
          ]
        });

        expect(called).toBe(true);
      });

      it('should use renderer from custom string', function () {
        var myRenderer = jasmine.createSpy('myRenderer');

        Handsontable.renderers.registerRenderer('myRenderer', myRenderer);

        handsontable({
          columns: [
            {
              renderer: 'myRenderer'
            }
          ]
        });

        expect(myRenderer).toHaveBeenCalled();
      });

      it('should support legacy namespace (pre-0.10.0) of cell renderers', function () {
        var count = 0;
        handsontable({
          renderer: function () {
            count++;
            Handsontable.TextCell.renderer.apply(this, arguments);
          }
        });
        expect(count).toBeGreaterThan(0);
      });
    });
  });
});