namespace pixi_projection {
	export class ProjectionsManager {
		/**
		 * A reference to the current renderer
		 *
		 * @member {PIXI.Renderer}
		 */
		renderer: PIXI.Renderer;

		constructor(renderer: PIXI.Renderer) {
			this.renderer = renderer;
            this.renderer.mask.pushSpriteMask = pushSpriteMask;
		}
	}

	function pushSpriteMask(target: any, maskData: PIXI.Sprite): void {
		let alphaMaskFilter = this.alphaMaskPool[this.alphaMaskIndex];

		if (!alphaMaskFilter) {
			alphaMaskFilter = this.alphaMaskPool[this.alphaMaskIndex] = [new SpriteMaskFilter2d(maskData)];
		}

		alphaMaskFilter[0].resolution = this.renderer.resolution;
		alphaMaskFilter[0].maskSprite = maskData;

		// TODO - may cause issues!
		target.filterArea = maskData.getBounds(true);

		this.renderer.filterManager.pushFilter(target, alphaMaskFilter);

		this.alphaMaskIndex++;
	}

	PIXI.Renderer.registerPlugin('projections', ProjectionsManager as any);
}
