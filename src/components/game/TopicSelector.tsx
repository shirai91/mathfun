'use client';

import { useTranslations } from 'next-intl';
import { Topic } from '@/types';
import { TOPIC_CONFIGS } from '@/lib/constants';

interface TopicSelectorProps {
  onSelect: (topic: Topic) => void;
}

export default function TopicSelector({ onSelect }: TopicSelectorProps) {
  const t = useTranslations();

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-[#4A3728] mb-6">
        {t('topic.title')}
      </h2>
      <div className="grid grid-cols-1 gap-3">
        {TOPIC_CONFIGS.map((topic, index) => (
          <button
            key={topic.id}
            onClick={() => onSelect(topic.id)}
            className="btn-bounce flex items-center gap-4 p-4 rounded-2xl shadow-lg transition-all animate-fade-in text-white"
            style={{
              backgroundColor: topic.color,
              animationDelay: `${index * 0.08}s`,
            }}
          >
            <span className="text-4xl">{topic.emoji}</span>
            <div className="flex-1 text-left">
              <div className="text-xl font-black">{t(topic.titleKey)}</div>
              <div className="text-sm opacity-90">{t(topic.descriptionKey)}</div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 opacity-60"
            >
              <path
                fillRule="evenodd"
                d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
