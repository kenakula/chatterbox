/* eslint-disable */

import { cleanup } from '@testing-library/react';
import { server } from '@tests/msw/server';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

import '@testing-library/jest-dom/vitest';
import 'jsdom';

vi.mock('zustand');

class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props: PointerEventInit) {
    super(type, props);
    this.button = props.button || 0;
    this.ctrlKey = props.ctrlKey || false;
    this.pointerType = props.pointerType || 'mouse';
  }
}

window.PointerEvent = MockPointerEvent as any;
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

global.process.env.VITE_BASE_API_URL = 'http://localhost:3000/api';
global.process.env.VITE_JWT_COOKIE_NAME = 'test-cookie-name';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterAll(() => {
});

afterEach(() => {
  cleanup();
});
