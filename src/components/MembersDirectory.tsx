import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  UserCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Plus, 
  CheckCircle2, 
  ShieldCheck, 
  X,
  CreditCard,
  Building
} from 'lucide-react';
import { Member } from '../types';
import { formatKES } from '../utils/calculator';

interface MembersDirectoryProps {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
}

export const MembersDirectory: React.FC<MembersDirectoryProps> = ({ members, setMembers }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Dormant'>('All');
  const [selectedMember, setSelectedMember] = useState<Member>(members[0]);
  const [isAddingMember, setIsAddingMember] = useState(false);

  // New member form
  const [surname, setSurname] = useState('');
  const [otherNames, setOtherNames] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [county, setCounty] = useState('Bomet');
  const [department, setDepartment] = useState('Agriculture & Dairy');
  const [address, setAddress] = useState('P.O. Box 141 - Bomet');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');

  const filteredMembers = members.filter((m) => {
    const matchStatus = statusFilter === 'All' || m.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchQuery =
      !q ||
      m.fullName.toLowerCase().includes(q) ||
      m.memberNo.toLowerCase().includes(q) ||
      m.idNumber.toLowerCase().includes(q) ||
      m.phone.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.county.toLowerCase().includes(q);
    return matchStatus && matchQuery;
  });

  const handleRegisterMember = (e: React.FormEvent) => {
    e.preventDefault();
    const newMemberNo = `B36${Math.floor(100000 + Math.random() * 900000)}`;
    const fullName = `${surname.toUpperCase()} ${otherNames.toUpperCase()}`;
    const newM: Member = {
      id: `m-${Date.now()}`,
      memberNo: newMemberNo,
      idNumber: idNumber || `${Math.floor(20000000 + Math.random() * 20000000)}`,
      surname: surname.toUpperCase(),
      otherNames: otherNames.toUpperCase(),
      fullName,
      phone: phone || '+254 700 000 000',
      email: email || `${surname.toLowerCase()}@sacco.org`,
      gender,
      status: 'Active',
      regDate: new Date().toLocaleDateString('en-GB'),
      county,
      department,
      address,
      age: 35,
      maritalStatus: 'Married',
      membershipType: 'Individual',
      totalShares: 20000,
      totalDeposits: 50000,
      activeLoansCount: 0,
    };

    setMembers([newM, ...members]);
    setSelectedMember(newM);
    setIsAddingMember(false);
    setSurname('');
    setOtherNames('');
    setIdNumber('');
    setPhone('');
    setEmail('');
  };

  return (
    <section id="members" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-black uppercase tracking-wider mb-2 border border-blue-200">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>Membership Register & KYC</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Member Management & KYC Records
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              KYC verification, Common Interest Groups (CIGs), next of kin, and balance inquiries.
            </p>
          </div>

          <button
            onClick={() => setIsAddingMember(true)}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Member</span>
          </button>
        </div>

        {/* Selected Member Profile Card */}
        {selectedMember && (
          <div className="mb-8 rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-base shadow-xs">
                  {selectedMember.surname.charAt(0)}{selectedMember.otherNames.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900">{selectedMember.fullName}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                      {selectedMember.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 font-mono">
                    Member No: <strong className="text-blue-700 font-bold">{selectedMember.memberNo}</strong> | National ID: {selectedMember.idNumber}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase font-black">Registered Since</div>
                  <div className="text-xs font-bold text-slate-900">{selectedMember.regDate}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-black">Share Capital</span>
                <div className="text-base font-black text-blue-700 font-mono mt-0.5">
                  {formatKES(selectedMember.totalShares)}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-black">Non-Withdrawable</span>
                <div className="text-base font-black text-slate-900 font-mono mt-0.5">
                  {formatKES(selectedMember.totalDeposits)}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-black">County / Branch</span>
                <div className="text-xs font-bold text-slate-900 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#800020]" />
                  <span>{selectedMember.county}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-black">Phone Number</span>
                <div className="text-xs font-bold text-slate-900 font-mono mt-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{selectedMember.phone}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Members Directory Table */}
        <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-5 bg-slate-100 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-slate-900">Filter Status:</span>
              <div className="inline-flex rounded-lg border border-slate-300 p-0.5 bg-white">
                {(['All', 'Active', 'Dormant'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      statusFilter === st ? 'bg-blue-600 text-white' : 'text-slate-700 hover:text-black'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search member, ID, county..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-900 border-b border-slate-200 uppercase tracking-wider font-extrabold text-[11px]">
                <tr>
                  <th className="px-4 py-3.5">Member No</th>
                  <th className="px-4 py-3.5">Full Name</th>
                  <th className="px-4 py-3.5">ID Number</th>
                  <th className="px-4 py-3.5">Phone Number</th>
                  <th className="px-4 py-3.5">County</th>
                  <th className="px-4 py-3.5">Shares</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {filteredMembers.map((m) => (
                  <tr 
                    key={m.id}
                    onClick={() => setSelectedMember(m)}
                    className={`cursor-pointer transition-colors ${
                      selectedMember?.id === m.id ? 'bg-blue-50/70 font-semibold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="px-4 py-3 font-mono font-bold text-blue-700">{m.memberNo}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{m.fullName}</td>
                    <td className="px-4 py-3 font-mono text-slate-600">{m.idNumber}</td>
                    <td className="px-4 py-3 font-mono text-slate-700">{m.phone}</td>
                    <td className="px-4 py-3 text-slate-700">{m.county}</td>
                    <td className="px-4 py-3 font-mono font-bold text-emerald-700">{formatKES(m.totalShares)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        m.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMember(m);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 text-xs font-bold transition-all cursor-pointer"
                      >
                        Inspect KYC
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for Registering New Member */}
        {isAddingMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 space-y-4 border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                  <h3 className="font-black text-slate-900">Register New SACCO Member</h3>
                </div>
                <button
                  onClick={() => setIsAddingMember(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleRegisterMember} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-900 mb-1">Surname *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ROTICH"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold uppercase focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-900 mb-1">Other Names *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. KIPKEMOI"
                      value={otherNames}
                      onChange={(e) => setOtherNames(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold uppercase focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-900 mb-1">National ID / Passport *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 29481920"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-900 mb-1">Phone Number (M-Pesa) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+254 700 000 000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-900 mb-1">County *</label>
                    <input
                      type="text"
                      value={county}
                      onChange={(e) => setCounty(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-900 mb-1">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:border-blue-600 focus:outline-none cursor-pointer"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingMember(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
                  >
                    Save & Generate Member No
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
