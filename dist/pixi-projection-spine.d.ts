/// <reference types="pixi.js" />
/// <reference types="pixi-spine" />
declare namespace pixi_projection.utils {
    function createIndicesForQuads(size: number): Uint16Array;
    function isPow2(v: number): boolean;
    function nextPow2(v: number): number;
    function log2(v: number): number;
    import PointLike = PIXI.IPoint;
    function getIntersectionFactor(p1: PointLike, p2: PointLike, p3: PointLike, p4: PointLike, out: PointLike): number;
    function getPositionFromQuad(p: Array<PointLike>, anchor: PointLike, out: PointLike): PointLike;
}
declare namespace PIXI {
    interface ObservablePoint {
        _x: number;
        _y: number;
    }
    interface Transform {
        proj: pixi_projection.AbstractProjection;
    }
}
declare namespace pixi_projection {
    class AbstractProjection {
        constructor(legacy: PIXI.Transform, enable?: boolean);
        legacy: PIXI.Transform;
        _enabled: boolean;
        enabled: boolean;
        clear(): void;
    }
    enum TRANSFORM_STEP {
        NONE = 0,
        BEFORE_PROJ = 4,
        PROJ = 5,
        ALL = 9
    }
}
declare namespace pixi_projection {
    class LinearProjection<T> extends AbstractProjection {
        updateLocalTransform(lt: PIXI.Matrix): void;
        _projID: number;
        _currentProjID: number;
        _affine: AFFINE;
        affinePreserveOrientation: boolean;
        scaleAfterAffine: boolean;
        affine: AFFINE;
        local: T;
        world: T;
        enabled: boolean;
        clear(): void;
    }
}
declare namespace pixi_projection.webgl {
    class BatchBuffer {
        vertices: ArrayBuffer;
        float32View: Float32Array;
        uint32View: Uint32Array;
        constructor(size: number);
        destroy(): void;
    }
}
declare namespace pixi_projection.webgl {
    import BaseTexture = PIXI.BaseTexture;
    import ObjectRenderer = PIXI.ObjectRenderer;
    import VertexArrayObject = PIXI.glCore.VertexArrayObject;
    import Renderer = PIXI.Renderer;
    import Sprite = PIXI.Sprite;
    class BatchGroup {
        textures: Array<BaseTexture>;
        textureCount: number;
        ids: Array<Number>;
        size: number;
        start: number;
        blend: PIXI.BLEND_MODES;
        uniforms: any;
    }
    abstract class MultiTextureSpriteRenderer extends ObjectRenderer {
        shaderVert: string;
        shaderFrag: string;
        MAX_TEXTURES_LOCAL: number;
        abstract createVao(vertexBuffer: PIXI.Buffer): PIXI.glCore.VertexArrayObject;
        abstract fillVertices(float32View: Float32Array, uint32View: Uint32Array, index: number, sprite: any, argb: number, textureId: number): void;
        getUniforms(spr: PIXI.Sprite): any;
        syncUniforms(obj: any): void;
        vertSize: number;
        vertByteSize: number;
        size: number;
        buffers: Array<BatchBuffer>;
        indices: Uint16Array;
        shader: PIXI.Shader;
        currentIndex: number;
        groups: Array<BatchGroup>;
        sprites: Array<Sprite>;
        indexBuffer: PIXI.Buffer;
        vertexBuffers: Array<PIXI.Buffer>;
        vaos: Array<VertexArrayObject>;
        vao: VertexArrayObject;
        vaoMax: number;
        vertexCount: number;
        MAX_TEXTURES: number;
        constructor(renderer: Renderer);
        onContextChange(): void;
        onPrerender(): void;
        render(sprite: Sprite): void;
        flush(): void;
        start(): void;
        stop(): void;
        destroy(): void;
    }
}
declare namespace pixi_projection.webgl {
    function generateMultiTextureShader(vertexSrc: string, fragmentSrc: string, maxTextures: number): PIXI.Shader;
}
declare namespace pixi_projection {
    import PointLike = PIXI.IPoint;
    abstract class Surface implements IWorldTransform {
        surfaceID: string;
        _updateID: number;
        vertexSrc: string;
        fragmentSrc: string;
        fillUniforms(uniforms: any): void;
        clear(): void;
        boundsQuad(v: ArrayLike<number>, out: any, after?: PIXI.Matrix): void;
        abstract apply(pos: PointLike, newPos: PointLike): PointLike;
        abstract applyInverse(pos: PointLike, newPos: PointLike): PointLike;
    }
}
declare namespace pixi_projection {
    import PointLike = PIXI.IPoint;
    class BilinearSurface extends Surface {
        distortion: PIXI.Point;
        constructor();
        clear(): void;
        apply(pos: PointLike, newPos?: PointLike): PointLike;
        applyInverse(pos: PointLike, newPos: PointLike): PointLike;
        mapSprite(sprite: PIXI.Sprite, quad: Array<PointLike>, outTransform?: PIXI.Transform): this;
        mapQuad(rect: PIXI.Rectangle, quad: Array<PointLike>, outTransform: PIXI.Transform): this;
        fillUniforms(uniforms: any): void;
    }
}
declare namespace pixi_projection {
    class Container2s extends PIXI.Container {
        constructor();
        proj: ProjectionSurface;
        readonly worldTransform: any;
    }
}
declare namespace pixi_projection {
    import PointLike = PIXI.IPoint;
    interface IWorldTransform {
        apply(pos: PointLike, newPos: PointLike): PointLike;
        applyInverse(pos: PointLike, newPos: PointLike): PointLike;
    }
    class ProjectionSurface extends AbstractProjection {
        constructor(legacy: PIXI.Transform, enable?: boolean);
        _surface: Surface;
        _activeProjection: ProjectionSurface;
        enabled: boolean;
        surface: Surface;
        applyPartial(pos: PointLike, newPos?: PointLike): PointLike;
        apply(pos: PointLike, newPos?: PointLike): PointLike;
        applyInverse(pos: PointLike, newPos: PointLike): PointLike;
        mapBilinearSprite(sprite: PIXI.Sprite, quad: Array<PointLike>): void;
        _currentSurfaceID: number;
        _currentLegacyID: number;
        _lastUniforms: any;
        clear(): void;
        readonly uniforms: any;
    }
}
declare namespace pixi_projection {
}
declare namespace pixi_projection {
}
declare namespace pixi_projection {
    import PointLike = PIXI.IPoint;
    class StrangeSurface extends Surface {
        constructor();
        params: number[];
        clear(): void;
        setAxisX(pos: PointLike, factor: number, outTransform: PIXI.Transform): void;
        setAxisY(pos: PointLike, factor: number, outTransform: PIXI.Transform): void;
        _calc01(): void;
        apply(pos: PointLike, newPos?: PointLike): PointLike;
        applyInverse(pos: PointLike, newPos: PointLike): PointLike;
        mapSprite(sprite: PIXI.Sprite, quad: Array<PointLike>, outTransform?: PIXI.Transform): this;
        mapQuad(rect: PIXI.Rectangle, quad: Array<PointLike>, outTransform: PIXI.Transform): this;
        fillUniforms(uniforms: any): void;
    }
}
declare namespace pixi_projection {
    class Sprite2s extends PIXI.Sprite {
        constructor(texture: PIXI.Texture);
        proj: ProjectionSurface;
        aTrans: PIXI.Matrix;
        _calculateBounds(): void;
        calculateVertices(): void;
        calculateTrimmedVertices(): void;
        readonly worldTransform: any;
    }
}
declare namespace pixi_projection {
    class Text2s extends PIXI.Text {
        constructor(text?: string, style?: PIXI.TextStyle, canvas?: HTMLCanvasElement);
        proj: ProjectionSurface;
        aTrans: PIXI.Matrix;
        readonly worldTransform: any;
    }
}
declare module PIXI {
    interface Sprite {
        convertTo2s(): void;
    }
    interface Container {
        convertTo2s(): void;
        convertSubtreeTo2s(): void;
    }
}
declare namespace pixi_projection {
}
declare namespace pixi_projection {
    function container2dWorldTransform(): any;
    class Container2d extends PIXI.Container {
        constructor();
        proj: Projection2d;
        toLocal<T extends PIXI.IPoint>(position: PIXI.IPoint, from?: PIXI.DisplayObject, point?: T, skipUpdate?: boolean, step?: TRANSFORM_STEP): T;
        readonly worldTransform: any;
    }
    let container2dToLocal: <T extends PIXI.IPoint>(position: PIXI.IPoint, from?: PIXI.DisplayObject, point?: T, skipUpdate?: boolean, step?: TRANSFORM_STEP) => T;
}
declare namespace pixi_projection {
    import IPoint = PIXI.IPoint;
    enum AFFINE {
        NONE = 0,
        FREE = 1,
        AXIS_X = 2,
        AXIS_Y = 3,
        POINT = 4,
        AXIS_XR = 5
    }
    class Matrix2d {
        static readonly IDENTITY: Matrix2d;
        static readonly TEMP_MATRIX: Matrix2d;
        mat3: Float64Array;
        floatArray: Float32Array;
        constructor(backingArray?: ArrayLike<number>);
        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;
        set(a: number, b: number, c: number, d: number, tx: number, ty: number): this;
        toArray(transpose?: boolean, out?: Float32Array): Float32Array;
        apply(pos: IPoint, newPos: IPoint): IPoint;
        translate(tx: number, ty: number): this;
        scale(x: number, y: number): this;
        scaleAndTranslate(scaleX: number, scaleY: number, tx: number, ty: number): void;
        applyInverse(pos: IPoint, newPos: IPoint): IPoint;
        invert(): Matrix2d;
        identity(): Matrix2d;
        clone(): Matrix2d;
        copyTo(matrix: Matrix2d): Matrix2d;
        copyTo2dOr3d(matrix: Matrix2d): Matrix2d;
        copy(matrix: PIXI.Matrix, affine?: AFFINE, preserveOrientation?: boolean): void;
        copyFrom(matrix: PIXI.Matrix): this;
        setToMultLegacy(pt: PIXI.Matrix, lt: Matrix2d): this;
        setToMultLegacy2(pt: Matrix2d, lt: PIXI.Matrix): this;
        setToMult(pt: Matrix2d, lt: Matrix2d): this;
        prepend(lt: any): this;
    }
}
declare namespace pixi_projection {
    import PointLike = PIXI.IPoint;
    class Projection2d extends LinearProjection<Matrix2d> {
        constructor(legacy: PIXI.Transform, enable?: boolean);
        matrix: Matrix2d;
        pivot: PIXI.ObservablePoint;
        reverseLocalOrder: boolean;
        onChange(): void;
        setAxisX(p: PointLike, factor?: number): void;
        setAxisY(p: PointLike, factor?: number): void;
        mapSprite(sprite: PIXI.Sprite, quad: Array<PointLike>): void;
        mapQuad(rect: PIXI.Rectangle, p: Array<PointLike>): void;
        updateLocalTransform(lt: PIXI.Matrix): void;
        clear(): void;
    }
}
declare namespace pixi_projection {
    class Mesh2d extends PIXI.Mesh {
        constructor(texture: PIXI.Texture, vertices?: Float32Array, uvs?: Float32Array, indices?: Uint16Array, drawMode?: number);
        proj: Projection2d;
        toLocal<T extends PIXI.IPoint>(position: PIXI.IPoint, from?: PIXI.DisplayObject, point?: T, skipUpdate?: boolean, step?: TRANSFORM_STEP): T;
        readonly worldTransform: any;
    }
}
declare namespace pixi_projection {
    class Mesh2dRenderer extends PIXI.mesh.MeshRenderer {
        onContextChange(): void;
    }
}
declare namespace pixi_projection {
    class Sprite2d extends PIXI.Sprite {
        constructor(texture: PIXI.Texture);
        proj: Projection2d;
        _calculateBounds(): void;
        calculateVertices(): void;
        calculateTrimmedVertices(): void;
        toLocal<T extends PIXI.IPoint>(position: PIXI.IPoint, from?: PIXI.DisplayObject, point?: T, skipUpdate?: boolean, step?: TRANSFORM_STEP): T;
        readonly worldTransform: any;
    }
}
declare namespace pixi_projection {
}
declare namespace pixi_projection {
    class Text2d extends PIXI.Text {
        constructor(text?: string, style?: PIXI.TextStyle, canvas?: HTMLCanvasElement);
        proj: Projection2d;
        readonly worldTransform: any;
    }
}
declare module PIXI {
    interface Sprite {
        convertTo2d(): void;
    }
    interface Container {
        convertTo2d(): void;
        convertSubtreeTo2d(): void;
    }
    namespace mesh {
        interface Mesh {
            convertTo2d(): void;
        }
    }
}
declare namespace pixi_projection {
}
declare namespace pixi_projection {
    class TilingSprite2d extends PIXI.TilingSprite {
        constructor(texture: PIXI.Texture, width: number, height: number);
        tileProj: Projection2d;
        proj: Projection2d;
        readonly worldTransform: any;
        toLocal<T extends PIXI.IPoint>(position: PIXI.IPoint, from?: PIXI.DisplayObject, point?: T, skipUpdate?: boolean, step?: TRANSFORM_STEP): T;
        _renderWebGL(renderer: PIXI.Renderer): void;
    }
}
declare namespace pixi_projection {
    class TilingSprite2dRenderer extends PIXI.TilingSpriteRenderer {
        shader: PIXI.Shader;
        simpleShader: PIXI.Shader;
        quad: PIXI.Quad;
        onContextChange(): void;
        render(ts: any): void;
    }
}
declare namespace pixi_projection {
    class ProjectionsManager {
        renderer: PIXI.Renderer;
        gl: WebGLRenderingContext;
        constructor(renderer: PIXI.Renderer);
        onContextChange: (gl: WebGLRenderingContext) => void;
        destroy(): void;
    }
}
declare namespace pixi_projection {
    interface SpriteMaskFilter2dUniforms {
        mask: PIXI.Texture;
        otherMatrix: PIXI.Matrix | Matrix2d;
        alpha: number;
        maskClamp: Float32Array;
    }
    class SpriteMaskFilter2d extends PIXI.Filter<SpriteMaskFilter2dUniforms> {
        constructor(sprite: PIXI.Sprite);
        maskSprite: PIXI.Sprite;
        maskMatrix: Matrix2d;
        apply(filterManager: PIXI.FilterManager, input: PIXI.RenderTarget, output: PIXI.RenderTarget, clear?: boolean, currentState?: any): void;
        static calculateSpriteMatrix(currentState: any, mappedMatrix: Matrix2d, sprite: PIXI.Sprite): Matrix2d;
    }
}
declare namespace pixi_projection {
    function container3dWorldTransform(): any;
    class Container3d extends PIXI.Container {
        constructor();
        proj: Projection3d;
        isFrontFace(forceUpdate?: boolean): boolean;
        getDepth(forceUpdate?: boolean): number;
        toLocal<T extends PIXI.IPoint>(position: PIXI.IPoint, from?: PIXI.DisplayObject, point?: T, skipUpdate?: boolean, step?: TRANSFORM_STEP): T;
        readonly worldTransform: any;
        position3d: PIXI.IPoint;
        scale3d: PIXI.IPoint;
        euler: Euler;
        pivot3d: PIXI.IPoint;
    }
    let container3dToLocal: <T extends PIXI.IPoint>(position: PIXI.IPoint, from?: PIXI.DisplayObject, point?: T, skipUpdate?: boolean, step?: TRANSFORM_STEP) => T;
    let container3dGetDepth: (forceUpdate?: boolean) => number;
    let container3dIsFrontFace: (forceUpdate?: boolean) => boolean;
}
declare namespace pixi_projection {
    class Camera3d extends Container3d {
        constructor();
        _far: number;
        _near: number;
        _focus: number;
        _orthographic: boolean;
        readonly far: number;
        readonly near: number;
        readonly focus: number;
        readonly ortographic: boolean;
        setPlanes(focus: number, near?: number, far?: number, orthographic?: boolean): void;
    }
}
declare namespace pixi_projection {
    class Euler implements PIXI.Point, PIXI.ObservablePoint {
        constructor(x?: number, y?: number, z?: number);
        _quatUpdateId: number;
        _quatDirtyId: number;
        quaternion: Float64Array;
        _x: number;
        _y: number;
        _z: number;
        _sign: number;
        x: number;
        y: number;
        z: number;
        pitch: number;
        yaw: number;
        roll: number;
        set(x?: number, y?: number, z?: number): void;
        copyFrom(euler: PIXI.Point): void;
        clone(): Euler;
        update(): boolean;
    }
}
declare namespace pixi_projection {
    import IPoint = PIXI.IPoint;
    class Matrix3d {
        static readonly IDENTITY: Matrix3d;
        static readonly TEMP_MATRIX: Matrix3d;
        mat4: Float64Array;
        floatArray: Float32Array;
        _dirtyId: number;
        _updateId: number;
        _mat4inv: Float64Array;
        cacheInverse: boolean;
        constructor(backingArray?: ArrayLike<number>);
        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;
        set(a: number, b: number, c: number, d: number, tx: number, ty: number): this;
        toArray(transpose?: boolean, out?: Float32Array): Float32Array;
        setToTranslation(tx: number, ty: number, tz: number): void;
        setToRotationTranslationScale(quat: Float64Array, tx: number, ty: number, tz: number, sx: number, sy: number, sz: number): Float64Array;
        apply(pos: IPoint, newPos: IPoint): IPoint;
        translate(tx: number, ty: number, tz: number): this;
        scale(x: number, y: number, z?: number): this;
        scaleAndTranslate(scaleX: number, scaleY: number, scaleZ: number, tx: number, ty: number, tz: number): void;
        applyInverse(pos: IPoint, newPos: IPoint): IPoint;
        invert(): Matrix3d;
        invertCopyTo(matrix: Matrix3d): void;
        identity(): Matrix3d;
        clone(): Matrix3d;
        copyTo(matrix: Matrix3d): Matrix3d;
        copyTo2d(matrix: Matrix2d): Matrix2d;
        copyTo2dOr3d(matrix: Matrix2d | Matrix3d): Matrix2d | Matrix3d;
        copy(matrix: PIXI.Matrix, affine?: AFFINE, preserveOrientation?: boolean): void;
        copyFrom(matrix: PIXI.Matrix): this;
        setToMultLegacy(pt: PIXI.Matrix, lt: Matrix3d): this;
        setToMultLegacy2(pt: Matrix3d, lt: PIXI.Matrix): this;
        setToMult(pt: Matrix3d, lt: Matrix3d): this;
        prepend(lt: any): void;
        static glMatrixMat4Invert(out: Float64Array, a: Float64Array): Float64Array;
        static glMatrixMat4Multiply(out: Float64Array, a: Float64Array, b: Float64Array): Float64Array;
    }
}
declare namespace pixi_projection {
    class ObservableEuler implements PIXI.Point, PIXI.ObservablePoint, Euler {
        cb: any;
        scope: any;
        constructor(cb: any, scope: any, x?: number, y?: number, z?: number);
        _quatUpdateId: number;
        _quatDirtyId: number;
        quaternion: Float64Array;
        _x: number;
        _y: number;
        _z: number;
        _sign: number;
        x: number;
        y: number;
        z: number;
        pitch: number;
        yaw: number;
        roll: number;
        set(x?: number, y?: number, z?: number): void;
        copyFrom(euler: PIXI.Point): this;
        clone(): Euler;
        update(): boolean;
    }
}
declare namespace PIXI {
    interface Point {
        z: number;
        set(x?: number, y?: number, z?: number): void;
    }
    interface ObservablePoint {
        _z: number;
        z: number;
        set(x?: number, y?: number, z?: number): void;
    }
}
declare namespace pixi_projection {
    class Point3d extends PIXI.Point {
        constructor(x?: number, y?: number, z?: number);
    }
}
declare namespace pixi_projection {
    class Projection3d extends LinearProjection<Matrix3d> {
        constructor(legacy: PIXI.Transform, enable?: boolean);
        cameraMatrix: Matrix3d;
        _cameraMode: boolean;
        cameraMode: boolean;
        position: PIXI.ObservablePoint;
        scale: PIXI.ObservablePoint;
        euler: ObservableEuler;
        pivot: PIXI.ObservablePoint;
        onChange(): void;
        clear(): void;
        updateLocalTransform(lt: PIXI.Matrix): void;
    }
}
declare namespace pixi_projection {
    class Mesh3d extends PIXI.Mesh {
        constructor(texture: PIXI.Texture, vertices?: Float32Array, uvs?: Float32Array, indices?: Uint16Array, drawMode?: number);
        proj: Projection3d;
        readonly worldTransform: any;
        toLocal<T extends PIXI.IPoint>(position: PIXI.IPoint, from?: PIXI.DisplayObject, point?: T, skipUpdate?: boolean, step?: TRANSFORM_STEP): T;
        isFrontFace(forceUpdate?: boolean): any;
        getDepth(forceUpdate?: boolean): any;
        position3d: PIXI.IPoint;
        scale3d: PIXI.IPoint;
        euler: Euler;
        pivot3d: PIXI.IPoint;
    }
}
declare namespace pixi_projection {
    class Sprite3d extends PIXI.Sprite {
        constructor(texture: PIXI.Texture);
        proj: Projection3d;
        culledByFrustrum: boolean;
        trimmedCulledByFrustrum: boolean;
        _calculateBounds(): void;
        calculateVertices(): void;
        calculateTrimmedVertices(): void;
        _renderWebGL(renderer: PIXI.Renderer): void;
        containsPoint(point: PIXI.IPoint): boolean;
        readonly worldTransform: any;
        toLocal<T extends PIXI.IPoint>(position: PIXI.IPoint, from?: PIXI.DisplayObject, point?: T, skipUpdate?: boolean, step?: TRANSFORM_STEP): T;
        isFrontFace(forceUpdate?: boolean): any;
        getDepth(forceUpdate?: boolean): any;
        position3d: PIXI.IPoint;
        scale3d: PIXI.IPoint;
        euler: Euler;
        pivot3d: PIXI.IPoint;
    }
}
declare namespace pixi_projection {
    class Text3d extends PIXI.Text {
        constructor(text?: string, style?: PIXI.TextStyle, canvas?: HTMLCanvasElement);
        proj: Projection3d;
        readonly worldTransform: any;
        toLocal<T extends PIXI.IPoint>(position: PIXI.IPoint, from?: PIXI.DisplayObject, point?: T, skipUpdate?: boolean, step?: TRANSFORM_STEP): T;
        isFrontFace(forceUpdate?: boolean): any;
        getDepth(forceUpdate?: boolean): any;
        position3d: PIXI.IPoint;
        scale3d: PIXI.IPoint;
        euler: Euler;
        pivot3d: PIXI.IPoint;
    }
}
declare module PIXI {
    interface Container {
        convertTo3d(): void;
        convertSubtreeTo3d(): void;
    }
}
declare namespace pixi_projection {
}
declare module pixi_projection {
    interface Sprite2d {
        region: PIXI.spine.core.TextureRegion;
    }
    interface Mesh2d {
        region: PIXI.spine.core.TextureRegion;
    }
    class Spine2d extends PIXI.spine.Spine {
        constructor(spineData: PIXI.spine.core.SkeletonData);
        proj: Projection2d;
        newContainer(): Container2d;
        newSprite(tex: PIXI.Texture): Sprite2d;
        newGraphics(): PIXI.Graphics;
        newMesh(texture: PIXI.Texture, vertices?: Float32Array, uvs?: Float32Array, indices?: Uint16Array, drawMode?: number): Mesh2d;
        transformHack(): number;
    }
}
declare module pixi_projection {
    interface Sprite3d {
        region: PIXI.spine.core.TextureRegion;
    }
    interface Mesh3d {
        region: PIXI.spine.core.TextureRegion;
    }
    class Spine3d extends PIXI.spine.Spine {
        constructor(spineData: PIXI.spine.core.SkeletonData);
        proj: Projection2d;
        newContainer(): Container3d;
        newSprite(tex: PIXI.Texture): Sprite3d;
        newGraphics(): PIXI.Graphics;
        newMesh(texture: PIXI.Texture, vertices?: Float32Array, uvs?: Float32Array, indices?: Uint16Array, drawMode?: number): Mesh3d;
        transformHack(): number;
    }
}
