export enum ResourceType {
    IMAGE_PNG = 1, IMAGE_JPEG, IMAGE_WEBP, VIDEO_MPEG, VIDEO_WEBM, VIDEO_OGG, AUDIO_MPEG, AUDIO_WEBM, AUDIO_OGG
}

export const ResourceFormat = {
    [ResourceType.IMAGE_PNG]: 'image/png',
    [ResourceType.IMAGE_JPEG]: 'image/jpeg',
    [ResourceType.IMAGE_WEBP]: 'image/webp',
    [ResourceType.VIDEO_MPEG]: 'video/mpeg',
    [ResourceType.VIDEO_WEBM]: 'video/webm',
    [ResourceType.VIDEO_OGG]: 'video/ogg',
    [ResourceType.AUDIO_MPEG]: 'audio/mpeg',
    [ResourceType.AUDIO_WEBM]: 'audio/webm',
    [ResourceType.AUDIO_OGG]: 'audio/ogg'
};

export class Resource {
    constructor(
      public url: string,
      public mime: string,
      public width?: number,
      public height?: number,
      public file?: Blob | File,
      public duration?: number,
      public title?: string,
      public alt?: string,
      public tags?: string,
      public description?: string,
    ) {}
  }
  