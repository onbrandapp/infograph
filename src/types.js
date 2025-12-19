/**
 * @typedef {Object} Stat
 * @property {string} label
 * @property {string} value
 * @property {'up' | 'down' | 'neutral'} trend
 */

/**
 * @typedef {Object} ChartPoint
 * @property {string} name
 * @property {number} value
 */

/**
 * @typedef {Object} InfographicData
 * @property {Object} meta
 * @property {string} meta.topic
 * @property {string} meta.date
 * @property {Object} content
 * @property {string} content.headline
 * @property {string} content.summary
 * @property {Stat[]} content.stats
 * @property {ChartPoint[]} content.chart_data
 * @property {string[]} content.citations
 * @property {string} content.source_url
 */

export const Types = {}; // This dummy export ensures VS Code treats this as a module.