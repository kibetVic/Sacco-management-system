import React, { useState } from 'react';
import { 
  Boxes, 
  Link, 
  Search, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  Hash, 
  Activity,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { BLOCKCHAIN_BLOCKS } from '../data/mockData';

export const BlockchainExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlock, setSelectedBlock] = useState(BLOCKCHAIN_BLOCKS[0]);

  const nodes = [
    { name: 'Apex Nairobi Node-01', status: 'Active (Consensus Sync)', latency: '14ms', role: 'Validator' },
    { name: 'Kericho West Node-02', status: 'Active (Consensus Sync)', latency: '19ms', role: 'Validator' },
    { name: 'Eldoret Hub Node-03', status: 'Active (Consensus Sync)', latency: '22ms', role: 'Witness' },
    { name: 'Bomet Central Node-04', status: 'Active (Consensus Sync)', latency: '16ms', role: 'Validator' },
  ];

  return (
    <section id="blockchain" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-black uppercase tracking-wider mb-2 border border-blue-200">
              <Link className="w-3.5 h-3.5 text-blue-600" />
              <span>Cryptographic Proof Engine</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Permissioned Blockchain Ledger Explorer
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              Every loan endorsement, share deposit, and repayment is cryptographically sealed across 4 distributed cooperative validator nodes.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <span className="font-mono text-emerald-800 font-bold">Consensus 100% Synchronized</span>
          </div>
        </div>

        {/* Nodes Status Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {nodes.map((node, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-slate-900">{node.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono font-bold">{node.role}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{node.status}</span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-2">Latency: {node.latency}</div>
            </div>
          ))}
        </div>

        {/* Blocks Inspection Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Blocks Sequence (Left) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">
              Recent Mined Blocks
            </div>
            {BLOCKCHAIN_BLOCKS.map((blk) => (
              <div
                key={blk.blockNumber}
                onClick={() => setSelectedBlock(blk)}
                className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all ${
                  selectedBlock.blockNumber === blk.blockNumber
                    ? 'bg-blue-50/80 border-blue-600 text-slate-900 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between font-mono mb-1.5">
                  <span className="font-black text-blue-700">Block #{blk.blockNumber}</span>
                  <span className="text-slate-500 text-[11px]">{blk.timestamp}</span>
                </div>
                <div className="font-mono text-[11px] text-slate-600 truncate">
                  Hash: {blk.hash}
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-700 pt-2 border-t border-slate-200">
                  <span>Transactions: <strong className="text-slate-900">{blk.txCount} txs</strong></span>
                  <span className="text-slate-600 font-medium">{blk.validator}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Block Detail Inspector (Right) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Boxes className="w-4 h-4 text-blue-600" />
                <span>Block #{selectedBlock.blockNumber} Specification</span>
              </h3>
              <span className="text-xs font-mono text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full font-bold">
                Verified Cryptographic State
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-700 block text-[11px] font-black mb-1">BLOCK HASH (SHA-256)</span>
                <div className="p-3 rounded-xl bg-white border border-slate-200 font-mono text-blue-800 font-bold break-all select-all shadow-xs">
                  {selectedBlock.hash}
                </div>
              </div>

              <div>
                <span className="text-slate-700 block text-[11px] font-black mb-1">PREVIOUS BLOCK HASH (PARENT LINK)</span>
                <div className="p-3 rounded-xl bg-white border border-slate-200 font-mono text-slate-600 break-all select-all shadow-xs">
                  {selectedBlock.prevHash}
                </div>
              </div>

              <div>
                <span className="text-slate-700 block text-[11px] font-black mb-1">MERKLE ROOT TREE</span>
                <div className="p-3 rounded-xl bg-white border border-slate-200 font-mono text-[#800020] font-bold break-all select-all shadow-xs">
                  {selectedBlock.merkleRoot}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Validator Authority</span>
                  <span className="font-bold text-slate-900 font-mono mt-0.5 block">{selectedBlock.validator}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Gas & Computational Load</span>
                  <span className="font-bold text-blue-700 font-mono mt-0.5 block">{selectedBlock.gasUsed}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
