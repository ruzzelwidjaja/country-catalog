import React from 'react';

export const Footer: React.FC = () => {
  return (
    <div className="p-4 border-t mt-auto bg-zinc-100 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-600">
        <div className="flex gap-6 justify-end max-w-md mx-auto">
          <a
            className="text-xs text-zinc-600 dark:text-zinc-400 flex items-center gap-0.25"
            href="https://github.com/ruzzelwidjaja/country-search"
            target="_blank"
          >
            GitHub
            <svg
              fill="none"
              height="16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="16"
              aria-hidden="true"
              className="w-3 h-3 ml-1"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
              <path d="M15 3h6v6"></path>
              <path d="M10 14L21 3"></path>
            </svg>
          </a>
        </div>
      </div>
  )
}