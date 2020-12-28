import React from 'react';
import { Link } from 'react-router-dom';

export default function SecretPage() {
  return (
    <div>
      This is a super secret page that must be protected
      <Link to="/" className="btn btn-primary w-100 mt-3">Dashboard</Link>
    </div>
  )
}
