import { useState, useEffect } from "react";
import { DateRangePicker } from "react-date-range";

export default function Admin_dashboard() {
  const [dashboarddata, setDatshboarddata] = useState(null);
  const [staticCount, setStaticCount] = useState(null);
  const [value, setValue] = useState(10);
  const [showResults, setShowResults] = useState(false);
  const onClick = () => setShowResults(true);

  useEffect(() => {
    async function fetchDashboardData() {
      const response = await fetch(
        "https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?fromdate=2022-06-01&todate=2022-07-01"
      );

      const data = await response.json();
      setDatshboarddata(data.data);
    }
    fetchDashboardData();
  }, []);

  useEffect(() => {
    async function fetchStaticcount() {
      const response = await fetch(
        "https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticcount?fromdate=2022-07-01&todate=2022-07-14"
      );

      const data = await response.json();
      setStaticCount(data.data);
    }
    fetchStaticcount();
  }, []);

  function handleSelect(ranges) {
    console.log(ranges.selection);

    var endDate = ranges.selection.endDate;
    var startDate = ranges.selection.startDate;
  }

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  return (
    <div className="admin_dashboard">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-10 ">
            <div className="bg_blue">
              <div className="row ">
                <div className="col-6 col-md-4 mt-3">
                  <div className="row">
                    <div className="col-3">
                      <img src="" alt="" />
                    </div>
                    <div className="col-6">
                      <div className="install_statics">
                        {staticCount && staticCount.totalInstall}
                      </div>
                      <div className="install_title">App Installed</div>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-4 mt-3">
                  <div className="row">
                    <div className="col-3">
                      <img src="" alt="" />
                    </div>
                    <div className="col-6">
                      <div className="install_statics">
                        {staticCount && staticCount.activeinstall}
                      </div>
                      <div className="install_title">Active Installs</div>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-4 mt-3">
                  <div className="row">
                    <div className="col-3">
                      <img src="" alt="" />
                    </div>
                    <div className="col-6">
                      <div className="install_statics">
                        {staticCount && staticCount.churn}
                      </div>
                      <div className="install_title">Churn Rate</div>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-4 mt-3">
                  <div className="row">
                    <div className="col-3">
                      <img src="" alt="" />
                    </div>
                    <div className="col-6">
                      <div className="install_statics">
                        {staticCount && staticCount.totaluninstall}
                      </div>
                      <div className="install_title">App Un-Installed</div>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-4 mt-3">
                  <div className="row">
                    <div className="col-3">
                      <img src="" alt="" />
                    </div>
                    <div className="col-6">
                      <div className="install_statics">
                        {staticCount && staticCount.aliveappusers}
                      </div>
                      <div className="install_title">Alive Apps users</div>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-4 mt-3">
                  <div className="row">
                    <div className="col-3">
                      <img src="" alt="" />
                    </div>
                    <div className="col-6">
                      <div className="install_statics">
                        {staticCount && staticCount.alivechurn}
                      </div>
                      <div className="install_title">Alive Churn Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg_blue">
              <div className="row justify-content-between p-1">
                <div className=" d-flex entries_select">
                  <label className="mr-2" for="entries">
                    show{" "}
                  </label>
                  <select
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                    value={value}
                    id="entries"
                    className="mr-2"
                  >
                    <option value="10" selected>
                      10
                    </option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  Entries
                </div>
                <div className="">
                  <div>
                    <button onClick={onClick}>Select Date</button>
                    {showResults ? (
                      <div>
                        {" "}
                        <DateRangePicker
                          ranges={[selectionRange]}
                          onChange={handleSelect}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table text-center ">
                  <thead className="thead-dark">
                    <tr>
                      <th>Date</th>
                      <th>Day Installs</th>
                      <th>Plateform</th>
                      <th>Day Uninstalls</th>
                      <th>Plateform</th>
                      <th>Plateform</th>
                      <th>Churn Plateform</th>
                    </tr>
                  </thead>
                  {dashboarddata && dashboarddata.value < 0 ? (
                    <div>Null</div>
                  ) : (
                    dashboarddata &&
                    dashboarddata.slice(0, value).map((datas) => {
                      return (
                        <tbody>
                          <tr>
                            <td>
                              {" "}
                              {new Date(datas.created_At).toDateString()}{" "}
                            </td>
                            <td>{datas.totalinstall}</td>
                            <td>
                              <div>
                                {" "}
                                <i
                                  class="fa fa-android pr-2"
                                  aria-hidden="true"
                                ></i>
                                {datas.android_install}
                              </div>
                              <div>
                                <i
                                  class="fa fa-apple pr-2"
                                  aria-hidden="true"
                                ></i>
                                {datas.ios_install}
                              </div>
                            </td>
                            <td>{datas.totaluninstall}</td>
                            <td>
                              <div>
                                <i
                                  class="fa fa-android pr-2"
                                  aria-hidden="true"
                                ></i>{" "}
                                {datas.android_uninstall}
                              </div>

                              <div>
                                {" "}
                                <i
                                  class="fa fa-apple pr-2"
                                  aria-hidden="true"
                                ></i>
                                {datas.ios_uninstall}
                              </div>
                            </td>
                            <td>{datas.totalchurn}</td>
                            <td>
                              {datas.android_churn} {datas.ios_churn}
                            </td>
                          </tr>
                        </tbody>
                      );
                    })
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
