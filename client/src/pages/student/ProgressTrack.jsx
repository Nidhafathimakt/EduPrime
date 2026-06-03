import React, { useEffect, useState } from "react";
import ProgressService from "../../services/instructorApiService/ProgressService";

function ProgressTrack() {
  const { getMyProgress } = ProgressService();

  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = async () => {
    try {
      setLoading(true);

      const res = await getMyProgress();

      setProgress(res.data || []);
    } catch (err) {
      console.log(err);
      setProgress([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Progress Tracker</h1>
      <p className="text-gray-500">Track your learning across all courses</p>

      <div className="mt-6 space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : progress.length === 0 ? (
          <p className="py-12 text-center text-gray-500">No progress yet</p>
        ) : (
          progress.map((p) => (
            <div key={p._id} className="card">
              <div className="flex justify-between">
                <h3 className="font-semibold">{p.courseId?.title}</h3>

                <span className="text-primary-600 font-medium">
                  {p.progressPercentage}%
                </span>
              </div>

              <div className="mt-2 h-3 bg-gray-200 rounded-full">
                <div
                  className="h-3 bg-primary-600 rounded-full"
                  style={{ width: `${p.progressPercentage}%` }}
                />
              </div>

              <p className="mt-2 text-sm text-gray-500">
                {p.completedLessons?.length || 0} lessons completed
                {p.certificateIssued && (
                  <span className="ml-2 text-green-600">
                    Certificate Earned
                  </span>
                )}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProgressTrack;
