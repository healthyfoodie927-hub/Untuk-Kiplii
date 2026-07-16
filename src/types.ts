export interface PromiseItem {
  id: string;
  title: string;
  emoji: string;
  description: string;
}

export type AppStage = 'intro' | 'envelope' | 'letter' | 'success';
