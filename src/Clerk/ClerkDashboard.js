import React from "react";
import "./clerk.css";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Nav from "../NavBar/Nav";

export default function ClerkDashboard() {
  const history = useHistory();
  useEffect(() => {
    fetch("/checkCustomerType", {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          history.push("/login");
        } else if (data.message !== "Clerk") {
          history.push("/wrongPage");
        }
      });
  }, []);

  return (
    <div>
      <Nav />
      <div className="clerk">
        <div className="Headline">
          <h1>Clerk Dashboard </h1>
        </div>
        <div className="first">
          <div className="grid-container">
            <div className="grid-item">
              <button
                className="btn notnav"
                type="button"
                value="Submit"
                onClick={() => {
                  history.push("/approveAccount");
                }}
              >
                <div>
                  <div>
                    <h2>Approve customer account & sent to manager</h2>
                  </div>
                  <div>
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABJlBMVEVGp0HxxA/znxn////yrxfznRnxxw5Dpj7xwwDzmwBApTs8ozY3oTE9pDjm8uXzmgD999v5nxf+8t3vvQCm0qP99uX98ub4xQzs9ezylAD3+/c8pkM0oS5KqEWBwH4mnB9tt2mNxYtjsmD/nhT+/PSUyJLZ69i+3b1cslj0pjZSq07K48mBv37d7dy42rfG4cX00F13u3Ss06vioB52pTj33Y70oihzuW+dzZtkpTtWqj2FsTPGvB3kwhSRsi/WoSH22Hv4ypD627W/oij0q0XyyDL778v556r85871sFP667711Wr61adwrThepjtzrjiquCanoyyNpDS8oiezuSbVvxiZpDDdoCDzzUn30o/2v3ivoyv0vlf2uWj50pv224b74sDVsx85xVzYAAAPwUlEQVR4nO2de3uTyhbGabAO4damxopcEkgbmuZCTKpNrNraq7XWetleeuqpur//lzhrBkhIA8mw7ZbEM+8ffQKBgR9rzVprBkI5jomJiYmJiYmJiYmJiYmJiYmJiYmJiYlp9iQr6fcRZRkh+Z/sSSsk3VpTSrGU9kRFqdJ1VdX1OtatncbNQ1Sqt9a2qRXldHvItsu3NorFtst3xNgtlF8+O7nBl27LirKaklDq6G4PSbIsiXY9fpOG84v+i2qa1k554ROVllDq8F0pABBR7CaWWv3F6y8XVUevxbeevrF0hEjS2mbk0Gjkg6goIhI5tQqBCK8jy+RbRL70PytS6NzwMViHNx5eMEXtinpfHjQ8bAcvSMMFpIiRZtDwbFBw9PSEUl+vRTufFfkgmpVq1RatutpHlsUhWexVqz2FNG/hL526CR3fcqo9mbQhc6Vqs44vmMVJqDMIXGKFt8sNVw4aFs0atEscx/IP0pMlsiBbzZ4omnUHNy1y9RARIQuZil2tVmSUltBSvcjmkqNZvvFszZZqqqaqGq9pvK5pqsgVdbysVUVObrt1V4Pv+qLY12GlWhHhNIr4I1/kxBpvlzRNC7uvvOGKUomHbTippFt2C9rRtY6iNHnJdslCU4Zjm0VN1a1KC5pRdbdmug3Tb0BRN6wunIPKNyyUjlC0eTsSRUYILdetIK5S7FXUYq1SM9t8v4ZQrcsXTThl16uLVp/v9LUShyquyyHT0x1LrDvwfY13NMeqBT0PWVpRQnW1KxPCjobbqbh8xWzyNl7gyALsonWsCg58lmiVVLVe1evB2eh2UXdgrybvSWYqQsXhUaQXRgkrDo9LAAR/cD+Uu7qN/Q/BaTVNj/fKiENlT9MqcDhF5B3T4WsmXlfla3VdbZoobFmu8tDHZA+3rZR4tYPbUWRXlZu6VsILotxQkaO3arKo8O0y7oRSudWS4MqQBrxW2UbgoBwcvJaOUO7zchJhnw9CEI6lqK51A5cB5yl7OnY5fL6+k5utrkls5FvM0luR6Ft2XZN0xqZE9vDbkZp6r8Nv+Cer2HzHwW0N44JS0ivg3bhFpPX9UAdphy+V0xEW9ejWI4QdvmeGhAp0ozAiyQ6veC2yIFb0DnFys9229boMMVCSytBJ+eqwWWTxDuY1VehWQBh0CyTqxc6gUVMvNnFbqLUR7onULkQokVyLuh90ZVPUnJSEfV5KsKEttvUqwt9iG8p9bRAZe3zNc4mNUCW44kDo8CVfnQYQRioYCXaVJSDv8yICy9RD51W7nUEfKbe8JmRMcJVB7pXdhtTCjiM12hKkNavS7G+0+JSEEM2sSLIYIVSgt6l9RfEJvVZ4JVCFr8QQViHoBtqo8b1Iqy29TeSCLaOELS9C6G40dRECUOAU+Pu2C8GVw+sghXBFTVcbG109JSHs7UR6zKgNOanmaaotEcLugBDibyyhLlqhooTglw1fbc1F0pBQ0qI2VL2mpmCaUoRQqulNRe6qEBBctVmzFDm1l3Ki644SBvG5hwlxOoagzWHCasBOTtnaiPFSXUKBxCih6WllmajchJ5d4gNCxOn9ASEy+T4hhOoiPH2p1ZbMRlsuw1gCByAcEiGMpSWEIFY1h7wdrUIOKVV1m5wjXMWqCIRguNB9zK5ajiGs6b3w6qMIIUJ6MTgAYHTLpbAdydFxMPOvr9LjbQcIOaXhimEjGjh1k+ds6J9Sw0/+cBppCTmzAck2LI7Emu6QveWGXiEhCEGQw4QQ5Bpl37yi1o0hbJTVthmARG0IIHb42Wxr5Q7fKJOt5IYL2S2oWsxGS/IJS3zPP/9yUbdw5CltNCQuJCx76QmR0uaLJNbJsl032yoHMd/strSKDdFfMeFKS27blExb9yRYIVtuizPjCG0oZiBbmDXPqg8Jo90ATr/T0VUPbyZ1+QpkfHVDxvt0IZETQq4M19ZUFEkukYwDnVCD1CsV8VrJLLpqakLoDx6veU6n2XX1nlTRWo5darTAXbtav9frwthKcvhuyZOh5qjavaKqVhQIAspNQhPOotG0S54GAWJAiN1q2NEtrd3Re5oLh3B1B9elFbLQ0KsydAw8xED1hu51YBVfxE1AnaCZuP+pGt5OrUA/TD3GR2at60Lx7Ho98JL6BtTFXVTv1upgSNVtQmtm3215olz3WprmFiFyK07fLzHqXT9uSA44smk3VK3V6Mio7oWDQbGzYQ0TruJAXrc4aEfdgGoPV94IL7RrMgS3rt+m6eBm2kG5IRWb+AqJlgcruxLq2nL6eRooFmCIZIlkmCdKXB2GPgjiGpRqlkgakyBV469Qva6Q7imGThgeS/T3tWBfvGpYRoxOQYkmZAv/ECLJxggvWJI/KgzbVCz/e39JDNqx6rj+wH01fq5lilCkAI98ujksH1uR8nsuyIf+ZpgQRY83uZlbmiP4lxXJ+APCP0vKH0/4f2DDnjskFDvunHSuNBKjM3tiObsTYWJiYmJiYmJiYmJiYmJiYmJiYpoNGURZn8W/IQKG0M7OzsXTiwsO/VmkgLbzbvf9888vFh48eHCnAMpt7R1++Ph050+gBIa3758TtgfCwsLC3TuLOdCiz3n45WK+IQ1j59nzu8C2MFBAGKiwtrb112NrXiHBep9eCMRySYQYEkz54WIeGQ20+zlqvCRCrLXC4Uc0Z4wGtwvmG+NLIARLLu495uaI0TCevbjhnVMIsbfuPZ4bXzXefk7gm0CI7Xh4MReIhvF+Ic4/pxIC49aXOTCj8e5FMt8UQog5e09nHNEwdicYcDphrrD9caYRjZ3nE/mmE4IZv81wUDV2JnooHWGusDeziMazyR5KSZhb25rRzgiASTkiHWGukJtJRGN3Oh8lISA+nj1EOkBKwllENJ5RAdISQtaYMUeFPkgnWkKob2aqhIM0QWdCekKcNGZIO5+nponUhLm1w9l5QNGYVsn8I8Jc4cOs+KmxSw2YijC3NiMB1Xh7lxowHWHh607WcEQGdSdMS5grHM6CEdP4qCAId5by+fnyU+OC1keFe8Llyyf/2b86yi/RQha+Zs1HH0cF4dHZOu9r/eB1njbxf8vaiMY7ulQvLJyEfD7j9hKlGTMfLNKFGeFHgKYP7HhNh5h1sDGe0QE+IVT3X7189N/rq3NCuX5FacWMS3AqE/oWvP8SYg3E0qWH+X3CeE0Vb7I1It2QQrjEQCfHw7trS0crsGb1iC6kZjnIoAukwgngLAskJAUZP7+NEX8+pDJihuHU2KECfAMwK8d+zA1rmvwmtutrGiMubv1rb+KaTvie2oRvgqQyqNqW9mHtAZWbrmU3SbzzggYQ98KTMGsO61Lsp6ubVG66lxUhZZx5CcZ6Mk6YP6d1U4g1WRHSxZlXkPsuxwmXXgPhPlVOLHzJyIgG1eQMITweJ1zcBsLvkwgH9s3KTY23dPXMGST7OMIcEJ4n54v89v4wX2YTTekiKbFhImGyDfPbPyEQBYhZDRPpxk1J/TB/NKkf5rdPcRbdDtw0m6RPlSuCovRHTKTZn1Ca+jXPIJsU9rKYWDTeUQH6+fAsxkvBSOtHkyzIrw+SyVYW+YJ6fkZYhpO9HKtprnBhGm/C/PYqseDR0Iez6IjGJ1pC7KYnNwgXlzDEVUiYj05P5TcDCw4BM8mIKSYRcZ86uxclXMz9xIEkRMgfra5sDmg3fQtuR6AzCTV0+Z4YEddtULgNx4f5/AGZyAgYFjHTaUCU3/SDzMjgMZOcj2gt6CcMcNRLQRAw4dLSNYEYpIql86HRwJw8yRMjXbSw9fsJ6caGoc5Ixzp7c7xwZ/vo+pRMYhwMutmi75en4KgB4OnmaAxazGVASFezBUb0rQiQ91dWg8m27+OxZRXKcd+CubEg+9sBaWfZBoxv7vNRrY5OJgaIp9cE8Of2GODazm83YkrCBeH4ycqAb2U/d6NcC+IL0em4BTMhTHFDxkcUhOOXr85+/jy/2syPl6NBGYP7Zy7uMeLfP+GWmtCHxPOl8fdlgkKG/xkHOC+ECxPvH/pWPIgfbaz9/plv+rJ0oAhhHgyZz9+wJrbiQQL+7NoQOt+PVyfLy8tnPy4F30sx2Ov9nysrK6fnVyO3oPK510njxSwIqWKpcHw2yBLry6/ePLr87+vrq4OVwZ221fPNUcYkwgxi6bvphJDoozcN47W+TzOjWPjdfFQ1jXB8EhQyyycrN1HXV05XVtcT89+YMhjkT61LheNlgvLkEcmFP4b+yt8/uDqCSLN97d9KPN2eds87i8p76thCWCCATxb8IIqjzPHlyyff969eQ8bPByF1+4AgTjNi4WsmI+DJ40O/2P5xL7JVkPFHnlLI4wmpqXPfmdwmnTKnT+6p8Y/u3Vg9nvEf4gmb9Sk3MDJ5xG3KhDC5p/ZqzMwxNQ25RZNQygwIs7jBNjkhCpc8vu87tj6ualvC4SZhXjFUFo8rGG8nmhD3wjeUhN9xT5zoplvZPMI3KdTgSdL7x+Pr4wgX8cxFwtRp4KTZPI8xacJUOL4fmeieQpjLrQxvUcRqLZsbiJNqbzKVPx5nEgiXICmuT7rhncHYiWhCVSM8Wo/c2p5KeD6ZcHErEz48J5yImI4w/30yYWaPRU3IiLdLuJjV4yYT8sXtEmaUK0AosXC7VcIMH/tKjqa3GmkKWT7sfTch6ZNssRyZhQp1905+XPi2xWpiPsz050ETYs0JGdyPazVGuC5NrmkyqboHhBdJgMKjqRM0o0ocPmWWDAPExMpNeDl9Emqo1eSnvjN75CsgfJtYfQuXZJ70plZidHo+4Wnh7FJFgJhcfgv3YiTceRijpeSZqEx7ISHcSQKMV7rfPWU0yXYDMd0dmrSEizPww6eJA+FfJSz8NQOAqW7opyRczP43QVjUD0elJ8w4UwyV4ieW6X4lOxM/sORwPKXvial+6ZxtNRNViniainAW4mggygei0xFmnutHlDwW/seE2f969IYoow39ezFmJcqEMihfHEH9bpPDrInGRPGOqBSE2f3UaYLorEhHuHZozSAhHSIV4drejL56z+Cm1280hLPzTpNxTS9RpxMWZqYYjdXUV7ZNJSzM6svaQuE3e/4K4drh73+8K6Umv9xzCiF+L+SsA3KTX9A6kbBQOJxxDw1lGLuJ2T+ZcHFtby4M6Mvg3ie8SDiJsFD4+nEmZiyoZezEM8YTFta2vswXH5bB7X5eGIOMISwUcvP1quuhDO7dp7sPRiFvEuL3zn97Op98WIZhvHv/eSHyZv0oYaFQ2N778HS+/3cAhuTe7n4ilPjfIwjkvz8Q5fa+fXzKzTmeL/LfO3ae7b7/9Pz557///vvwr28fPj6+QPNuvBsygn9Lgjj0h/2HEiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmpvnQ/wB+/RCr/nVFAgAAAABJRU5ErkJggg=="
                      width="20%"
                      height="25%"
                      alt="123"
                    ></img>
                  </div>
                </div>
              </button>
            </div>
            <div className="grid-item">
              <button className="btn notnav" type="button" value="Submit">
                <div>
                  <div>
                    <h2>
                      Delete, loan, credit card details of an customer account
                    </h2>
                  </div>
                  <div>
                    <img
                      src="https://thumbs.dreamstime.com/z/special-offer-love-book-delete-user-icons-set-credit-card-sign-vector-simple-discounts-customer-feedback-remove-profile-loan-143090432.jpg"
                      width="23%"
                      height="35%"
                      alt="123"
                    ></img>
                  </div>
                </div>
              </button>
            </div>
            <div className="grid-item">
              <button className="btn notnav" type="button" value="Submit">
                <div>
                  <div>
                    <h2>Edit and delete all customers details</h2>
                  </div>
                  <div>
                    <img
                      src="https://cdn.iconscout.com/icon/premium/png-512-thumb/edit-customer-account-2154718-1809578.png"
                      width="28%"
                      height="25%"
                      alt="1435"
                    ></img>
                  </div>
                </div>
              </button>
            </div>
            <div className="grid-item">
              <button className="btn notnav" type="button" value="Submit">
                <div>
                  <div>
                    <h2>Clerk can edit of credit bank product</h2>
                  </div>
                  <div>
                    <img
                      src="https://booster.io/wp-content/uploads/custom-order-numbers-e1438361586475.png"
                      width="21%"
                      height="20%"
                      alt="df324"
                    ></img>
                  </div>
                </div>
              </button>
            </div>
            <div className="grid-item">
              <button
                className="btn notnav"
                type="button"
                value="Submit"
                onClick={() => {
                  history.push("/approveTransactions");
                }}
              >
                <div>
                  <div>
                    <h2>Approve all the customers trasaction</h2>
                  </div>
                  <div>
                    <img
                      src="data:image/png;base64,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"
                      width="35%"
                      height="25%"
                      alt="345"
                    ></img>
                  </div>
                </div>
              </button>
            </div>
            <div className="grid-item">
              <button className="btn notnav" type="button" value="Submit">
                <div>
                  <div>
                    <h2>Respond to the all customers queries ?</h2>
                  </div>
                  <div>
                    <img
                      src="data:image/png;base64,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"
                      width="35%"
                      height="28%"
                      alt="56756"
                    ></img>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
