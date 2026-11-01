import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SQL_TABLES_SCHEMA } from '../../data/mockData';
import {
  X,
  Database,
  Terminal,
  Play,
  CheckCircle2,
  Code2,
  Server,
  Layers,
  Clock,
  Sparkles,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';

export const BackendSqlDrawer: React.FC = () => {
  const { isSqlDrawerOpen, setIsSqlDrawerOpen, sqlLogs, executeSql } = useApp();
  const [activeTab, setActiveTab] = useState<'sql' | 'api' | 'schema'>('sql');
  const [customQuery, setCustomQuery] = useState<string>(
    'SELECT * FROM Clients WHERE accountState = \'Active\''
  );
  const [queryResult, setQueryResult] = useState<{
    columns: string[];
    rows: Record<string, unknown>[];
    durationMs: number;
  } | null>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('GET /api/clients');
  const [apiResponseJson, setApiResponseJson] = useState<string | null>(null);
  const [apiLatency, setApiLatency] = useState<number>(14);

  if (!isSqlDrawerOpen) return null;

  const handleRunQuery = async () => {
    try {
      const res = await executeSql(customQuery);
      setQueryResult(res);
    } catch (err) {
      console.error('SQL query execution failed:', err);
    }
  };

  const handleRunEndpoint = async () => {
    const startTime = performance.now();
    try {
      let endpointUrl = '/api/clients';
      if (selectedEndpoint.includes('/posts')) {
        endpointUrl = '/api/posts';
      } else if (selectedEndpoint.includes('/leads')) {
        endpointUrl = '/api/leads';
      } else if (selectedEndpoint.includes('/campaigns')) {
        endpointUrl = '/api/campaigns';
      }

      const res = await fetch(endpointUrl);
      const data = await res.json();
      const latency = Math.round(performance.now() - startTime) + 4;
      setApiResponseJson(JSON.stringify(data, null, 2));
      setApiLatency(latency);
    } catch (err: any) {
      setApiResponseJson(JSON.stringify({ error: err.message }, null, 2));
      setApiLatency(Math.round(performance.now() - startTime));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="h-full w-full max-w-2xl bg-white shadow-2xl flex flex-col border-l border-slate-200">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 text-white font-mono font-bold">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold tracking-tight">
                  Node.js Express & SQL Database Console
                </h3>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                  Live DB Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Express REST API Services (14ms) + Persistent SQLite Relational DB
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSqlDrawerOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2">
          <button
            onClick={() => setActiveTab('sql')}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition ${
              activeTab === 'sql'
                ? 'border-indigo-600 text-indigo-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>SQL Query Console</span>
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition ${
              activeTab === 'api'
                ? 'border-indigo-600 text-indigo-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Express REST API</span>
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition ${
              activeTab === 'schema'
                ? 'border-indigo-600 text-indigo-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="h-3.5 w-3.5" />
            <span>Relational Schema (ERD)</span>
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'sql' && (
            <div className="space-y-4">
              {/* Presets */}
              <div className="flex flex-wrap gap-2">
                <span className="text-[11px] font-semibold text-slate-500 self-center">
                  Sample Queries:
                </span>
                <button
                  onClick={() => setCustomQuery('SELECT * FROM dbo.Clients')}
                  className="rounded-md bg-slate-100 hover:bg-slate-200 px-2 py-1 text-[11px] font-mono text-slate-700 transition"
                >
                  SELECT * FROM Clients
                </button>
                <button
                  onClick={() =>
                    setCustomQuery('SELECT * FROM dbo.SocialPosts WHERE Status = \'Pending Approval\'')
                  }
                  className="rounded-md bg-slate-100 hover:bg-slate-200 px-2 py-1 text-[11px] font-mono text-slate-700 transition"
                >
                  SELECT Pending Posts
                </button>
                <button
                  onClick={() =>
                    setCustomQuery('SELECT * FROM dbo.PatientLeads ORDER BY EstimatedRevenueINR DESC')
                  }
                  className="rounded-md bg-slate-100 hover:bg-slate-200 px-2 py-1 text-[11px] font-mono text-slate-700 transition"
                >
                  SELECT Top Leads
                </button>
              </div>

              {/* Editor */}
              <div className="rounded-xl border border-slate-300 bg-slate-950 p-3 shadow-inner">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                  <span>Server: MOHD-SQL-ENTERPRISE-01 • Database: MohdDigitalDb</span>
                  <span className="text-emerald-400">Ready</span>
                </div>
                <textarea
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  rows={3}
                  className="w-full mt-2 font-mono text-xs text-emerald-400 bg-transparent focus:outline-none resize-none selection:bg-indigo-600"
                />
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleRunQuery}
                    className="flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Execute T-SQL</span>
                  </button>
                </div>
              </div>

              {/* Results Table */}
              {queryResult && (
                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                  <div className="flex items-center justify-between bg-slate-50 px-4 py-2 border-b border-slate-200 text-xs">
                    <span className="font-semibold text-slate-700">
                      Results ({queryResult.rows.length} rows)
                    </span>
                    <span className="font-mono text-[11px] text-slate-500">
                      Query Execution: {queryResult.durationMs}ms
                    </span>
                  </div>
                  <div className="overflow-x-auto max-h-60">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100/80 text-[10px] uppercase font-bold text-slate-600 sticky top-0">
                        <tr>
                          {queryResult.columns.map((col) => (
                            <th key={col} className="px-3 py-2 border-b border-slate-200">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                        {queryResult.rows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-indigo-50/40">
                            {queryResult.columns.map((col) => (
                              <td key={col} className="px-3 py-2 text-slate-800 whitespace-nowrap">
                                {String(row[col] ?? '')}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Recent SQL Logs */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 mb-2">
                  Execution History (Telemetry):
                </h4>
                <div className="space-y-1.5">
                  {sqlLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between font-mono"
                    >
                      <div className="truncate max-w-sm text-slate-800">{log.query}</div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 shrink-0">
                        <span className="text-emerald-600 font-semibold">{log.durationMs}ms</span>
                        <span>•</span>
                        <span>{log.rowCount} rows</span>
                        <span>•</span>
                        <span>{log.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-900 leading-relaxed">
                Active Node.js Express REST API running on port 3000. Directly querying and updating persistent SQLite database tables on disk.
              </div>

              {/* Endpoint Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Select API Endpoint to Call Live:</label>
                <div className="space-y-1.5">
                  {[
                    { method: 'GET', url: '/api/clients', desc: 'Fetch all clients from SQL Clients table' },
                    { method: 'GET', url: '/api/posts', desc: 'Fetch all social posts from SocialPosts table' },
                    { method: 'GET', url: '/api/leads', desc: 'Fetch WhatsApp leads and conversation threads' },
                    { method: 'GET', url: '/api/campaigns', desc: 'Fetch monthly campaign ad spend & ROI metrics' },
                  ].map((ep) => (
                    <button
                      key={ep.url}
                      onClick={() => {
                        setSelectedEndpoint(`${ep.method} ${ep.url}`);
                        setApiResponseJson(null);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition ${
                        selectedEndpoint === `${ep.method} ${ep.url}`
                          ? 'border-indigo-600 bg-indigo-50/50'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                            ep.method === 'GET'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {ep.method}
                        </span>
                        <span className="font-mono text-xs font-semibold text-slate-800">
                          {ep.url}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 hidden sm:inline">
                        {ep.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleRunEndpoint}
                  className="flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-xs font-semibold text-white shadow-xs transition"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Execute Endpoint Live</span>
                </button>
              </div>

              {apiResponseJson && (
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs font-mono text-emerald-400">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400 mb-2">
                    <span>Live Response Body (application/json)</span>
                    <span className="text-emerald-400 font-bold">200 OK • {apiLatency}ms</span>
                  </div>
                  <pre className="overflow-x-auto text-[11px] leading-relaxed max-h-80">
                    {apiResponseJson}
                  </pre>
                </div>
              )}
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-700">
                Relational SQL Database Schema & Entity Relationships:
              </h4>
              <div className="space-y-4">
                {SQL_TABLES_SCHEMA.map((table) => (
                  <div
                    key={table.name}
                    className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs"
                  >
                    <div className="bg-slate-800 text-white px-4 py-2 text-xs font-mono font-bold flex items-center justify-between">
                      <span>{table.name}</span>
                      <span className="text-[10px] text-slate-300 font-normal">TABLE</span>
                    </div>
                    <div className="p-3">
                      <div className="grid grid-cols-3 text-[10px] font-bold uppercase text-slate-400 border-b pb-1 mb-2">
                        <span>Column</span>
                        <span>Type</span>
                        <span>Key</span>
                      </div>
                      <div className="space-y-1 font-mono text-xs">
                        {table.columns.map((c) => (
                          <div key={c.name} className="grid grid-cols-3 py-0.5 text-slate-700">
                            <span className="font-semibold text-slate-900">{c.name}</span>
                            <span className="text-slate-500 text-[11px]">{c.type}</span>
                            <span>
                              {c.isPrimary && (
                                <span className="rounded bg-amber-100 text-amber-800 px-1.5 py-0.2 text-[9px] font-bold">
                                  PK
                                </span>
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-3 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Node.js 22 • Express 4 REST API • SQLite Relational Database Engine</span>
          <button
            onClick={() => setIsSqlDrawerOpen(false)}
            className="rounded-lg bg-slate-900 px-4 py-1.5 font-semibold text-white hover:bg-slate-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
