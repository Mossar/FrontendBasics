/* Pseudocode example of components architecture */

<app>
    <header />
    <content>
        <search-bar />
        <video-entry>
            <video-element />
            <video-title />
            <video-description />
            <video-comments>
                <video-comment />
                <video-comment />
                // ...
            </video-comments>
        </video-entry>
        <video-list>
            <video-list-element />
            <video-list-element />
            // ...
        </video-list>
    </content>
    <footer />
</app>
