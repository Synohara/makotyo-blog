import React from 'react';
import { tracks } from './tracks-data';

export const metadata = {
  title: 'My Music Works | makotyo',
  description: 'Collection of my original music tracks',
};

const SoundCloudEmbed = ({ url }) => {
  return (
    <iframe 
      allowtransparency="true" 
      scrolling="no" 
      frameBorder="no" 
      src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=orange_white&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
      style={{ width: '100%', height: '166px' }}
    ></iframe>
  );
};

const TracksPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">My Music Works</h1>
      <div className="grid gap-8">
        {tracks.map((track, index) => (
          <div 
            key={index} 
            className="border rounded-lg p-6 hover:shadow-lg transition-all"
          >
            <h2 className="text-2xl font-semibold mb-2">{track.title}</h2>
            <p className="text-gray-600 mb-4">{track.description}</p>
            <div className="mb-4">
              <SoundCloudEmbed url={track.link} />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {track.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TracksPage;