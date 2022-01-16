function getPopupMedia(feature, list_id, html) {
    const POPUP_WIDTH = 500;

    if (feature.properties.image_id) {
        var image_link = document.createElement('a');
        image_link.className = 'popup-media';
        image_link.href = `https://steamuserimages-a.akamaihd.net/ugc/${feature.properties.image_id}/`;

        var image = document.createElement('img');
        image.src = `https://steamuserimages-a.akamaihd.net/ugc/${feature.properties.image_id}/`;
        image.width = POPUP_WIDTH;

        image_link.appendChild(image);
        html.appendChild(image_link);
    } else if (feature.properties.video_id) {
        var video = document.createElement('iframe');
        video.className = 'popup-media';
        video.width = POPUP_WIDTH;
        video.height = POPUP_WIDTH / 16 * 9;
        video.src = `https://www.youtube-nocookie.com/embed/${feature.properties.video_id}`;
        video.title = 'YouTube video player';
        video.frameborder = 0;
        // video.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; allowfullscreen'

        html.appendChild(video);
    }

    return html;
}
